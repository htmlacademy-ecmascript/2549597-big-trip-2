import FormEdit from '../view/form-edit.js';
import RouteListPoints from '../view/points-list-view.js';
import RoutePoint from '../view/point-view.js';
import {render, replace} from '../framework/render.js';
import {isEscKey} from '../utils.js';
export default class Presenter {
  #routeListPoints = new RouteListPoints();

  #container = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #points = [];

  constructor ({container, pointModel, destinationModel, offerModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init() {
    this.#points = [...this.#pointModel.point];

    render(this.#routeListPoints, this.#container);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint (point) {
    const onEditFormKeydown = (evt) => {
      if (isEscKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEditFormKeydown);
      }
    };

    const routePoint = new RoutePoint({
      point,
      destination: this.#destinationModel.getDestinationById(point.id),
      offer: this.#offerModel.getOffersByType(point.type),
      onClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', onEditFormKeydown);
      }
    });

    const formEdit = new FormEdit({
      point,
      destination: this.#destinationModel.getDestinationById(point.id),
      offer: this.#offerModel.getOffersByType(point.type),
      onSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', onEditFormKeydown);
      }
    });

    function replacePointToForm () {
      replace(formEdit, routePoint);
    }

    function replaceFormToPoint () {
      replace(routePoint, formEdit);
    }

    render(routePoint, this.#routeListPoints.element);
  }
}
