import RouteListPoints from '../view/points-list-view.js';
import {render, RenderPosition, remove, replace} from '../framework/render.js';
import EmptyList from '../view/empty-list.js';
import PointPresenter from '../presenter/point-presenter.js';
import NewPointPresenter from '../presenter/new-point-presenter.js';
import {filter} from '../utils/filter.js';
import Sorting from '../view/sorting-view.js';
import {SortTypes, UserAction, UpdateType, FilterType} from '../constants.js';
import {sortPointsByDay, sortPointsByPrice, sortPointsByTime} from '../utils/point.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import TripInfoView from '../view/trip-info-view.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class Presenter {
  #routeListPoints = new RouteListPoints();
  #loadingComponent = new LoadingView();
  #emptyListPoints = null;
  #sortComponent = null;
  #container = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #filterModel = null;
  #newPointPresenter = null;
  #currentSortType = SortTypes.DAY;
  #pointPresenters = new Map();
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #tripInfoContainer = null;
  #tripInfoComponent = null;

  constructor ({container, pointModel, destinationModel, offerModel, filterModel, onNewPointDestroy, tripInfoContainer}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#filterModel = filterModel;
    this.#tripInfoContainer = tripInfoContainer;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#container,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      destinationModel: destinationModel,
      offerModel: offerModel,
    });

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
    this.#offerModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortTypes.DAY:
        return filteredPoints.sort(sortPointsByDay);
      case SortTypes.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
      case SortTypes.TIME:
        return filteredPoints.sort(sortPointsByTime);
      default:
        return filteredPoints.sort(sortPointsByDay);
    }
  }

  init() {
    this.#renderBoard();
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointPresenters.get(update.id).setSaving();

        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }

        break;
      case UserAction.ADD_TASK:
        this.#newPointPresenter.setSaving();

        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }

        break;
      case UserAction.DELETE_TASK:
        this.#pointPresenters.get(update.id).setDeleting();

        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }

        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);

        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();

        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();

        break;
      case UpdateType.INIT:
        this.#clearBoard();
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();

        break;
    }
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  createPoint() {
    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderNoPoint() {
    this.#emptyListPoints = new EmptyList({
      messageType: this.#filterType
    });

    render(this.#emptyListPoints, this.#container);
  }

  #renderBoard() {
    render(this.#routeListPoints, this.#container);

    if (this.#isLoading) {
      this.#renderLoading();

      return;
    }

    if (this.points.length < 1) {
      this.#renderNoPoint();

      return;
    }

    this.#renderPoints();
    this.#renderTripInfo();
  }

  #renderTripInfo = () => {
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      points: this.#pointModel.points,
      destinations: this.#destinationModel.destination,
      offers: this.#offerModel.offers,
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, 'afterbegin');

      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderPoints();
  };

  #renderSorting() {
    this.#sortComponent = new Sorting({
      currentSort: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoints() {
    if(!this.#offerModel.offers.length || !this.#destinationModel.destination.length) {
      return;
    }

    this.#renderSorting();

    this.points.forEach((point) => {
      this.#renderPoint(point);
    });

    if (this.points.length === 0) {
      this.#renderNoPoint();
    }
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#routeListPoints.element,
      destinationModel: this.#destinationModel,
      offerModel: this.#offerModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      onPointClear: this.#clearPoint});

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPoint = (point) => {
    const targetPresenter = this.#pointPresenters.get(point.id);
    targetPresenter.destroy();
  };

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#tripInfoComponent);
    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#emptyListPoints) {
      remove(this.#emptyListPoints);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();

    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

}
