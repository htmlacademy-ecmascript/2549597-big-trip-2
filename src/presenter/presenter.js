import RouteListPoints from '../view/points-list-view.js';
import {render} from '../framework/render.js';
import EmptyList from '../view/empty-list.js';
import PointPresenter from '../presenter/point-presenter.js';
import {updateItem} from '../utils/utils.js';
export default class Presenter {
  #routeListPoints = new RouteListPoints();
  #emptyListPoints = new EmptyList({messageType: 'PRESENT'});

  #container = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #points = [];
  #pointPresenters = new Map();

  constructor ({container, pointModel, destinationModel, offerModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];

    this.#renderBoard();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
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

  #renderPoints() {
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
      onModeChange: this.#handleModeChange});

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
