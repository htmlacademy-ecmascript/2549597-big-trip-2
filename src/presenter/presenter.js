import RouteListPoints from '../view/points-list-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import EmptyList from '../view/empty-list.js';
import PointPresenter from '../presenter/point-presenter.js';
import {updateItem} from '../utils/utils.js';
import Sorting from '../view/sorting-view.js';
import {SortTypes} from '../constants.js';
import {sortPointsByDay, sortPointsByPrice, sortPointsByTime} from '../utils/point.js';

export default class Presenter {
  #routeListPoints = new RouteListPoints();
  #emptyListPoints = new EmptyList({messageType: 'PRESENT'});
  #sortComponent = null;
  #container = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #points = [];
  #currentSortType = SortTypes.DAY;
  #sourcedBoardPoints = [];
  #pointPresenters = new Map();
  #currentPresenter = null;

  constructor ({container, pointModel, destinationModel, offerModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#sourcedBoardPoints = [...this.#pointModel.points];

    this.#sortPoints(this.#currentSortType);
    this.#renderBoard();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderNoPoint() {
    render(this.#emptyListPoints, this.#container);
  }

  #renderBoard() {
    render(this.#routeListPoints, this.#container);

    if (this.#points.length < 1) {
      this.#renderNoPoint();

      return;
    }

    this.#renderPoints();
  }

  #sortPoints(sortType) {
    switch(sortType) {
      case SortTypes.DAY:
        this.#points.sort(sortPointsByDay);
        return;
      case SortTypes.PRICE:
        this.#points.sort(sortPointsByPrice);
        return;
      case SortTypes.TIME:
        this.#points.sort(sortPointsByTime);
        return;
      default:
        this.#points = this.#points.sort(sortPointsByDay);
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  #renderSorting() {
    this.#sortComponent = new Sorting({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSort: this.#currentSortType
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoints() {
    this.#renderSorting();

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#routeListPoints.element,
      destinationModel: this.#destinationModel,
      offerModel: this.#offerModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      onPointClear: this.#clearPoint});

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
    this.#currentPresenter = pointPresenter;
  }

  #clearPoint = () => {
    // const targetPresenter = this.#routeListPoints.element.get(point.id);
    this.#currentPresenter.destroy();
  };

  #clearPoints() {
    remove(this.#sortComponent);
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
