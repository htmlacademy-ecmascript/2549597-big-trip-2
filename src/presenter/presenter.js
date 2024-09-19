import FormEdit from '../view/form-edit.js';
import RouteListPoints from '../view/points-list-view.js';
import RoutePoint from '../view/point-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
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
    const routePoint = new RoutePoint({
      point,
      destination: this.#destinationModel.getDestinationById(point.id),
      offer: this.#offerModel.getOffersByType(point.type),
      onClick: () => this.#openEditForm(point)
    });

    render(routePoint, this.#routeListPoints.element);
  }

  #openEditForm = (point) => {
    const formEdit = new FormEdit({
      point,
      destination: this.#destinationModel.getDestinationById(point.id),
      offer: this.#offerModel.getOffersByType(point.type),
      onSubmit: () => this.#closeEditForm(formEdit)
    });

    document.addEventListener('keydown', (evt) => {
      this.#onDocumentKeydown(evt, formEdit);
    });

    render(formEdit, this.#container, RenderPosition.AFTERBEGIN);
  };


  #closeEditForm = (form) => {
    document.removeEventListener('keydown', (evt) => {
      this.#onDocumentKeydown(evt, form);
    });

    remove(form);
  };

  #onDocumentKeydown = (evt, form) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.#closeEditForm(form);
    }
  };
}
