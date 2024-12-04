import FormEdit from '../view/form-edit.js';
import RoutePoint from '../view/point-view.js';
import {render, replace, remove} from '../framework/render.js';
import {isEscKey} from '../utils/utils.js';
import {UserAction, UpdateType} from '../constants.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #destinationModel = null;
  #offerModel = null;
  #pointContainer = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #routePoint = null;
  #formEdit = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor({pointContainer, destinationModel, offerModel, onDataChange, onModeChange}) {
    this.#pointContainer = pointContainer;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevRoutePoint = this.#routePoint;
    const prevFormEdit = this.#formEdit;

    this.#routePoint = new RoutePoint({
      point: this.#point,
      destination: this.#destinationModel.getDestinationById(this.#point.destinationId),
      offer: this.#offerModel.getOffersByType(this.#point.type),
      onClick: () => {
        this.#replacePointToForm();
      },
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#formEdit = new FormEdit({
      point: this.#point,
      destination: this.#destinationModel,
      offer: this.#offerModel,
      onSubmit: this.#handleFormSubmit,
      onFormDeleteClick: this.#handleFormDeleteClick,
      onCloseForm: this.#handleCloseForm
    });

    if (prevRoutePoint === null || prevFormEdit === null) {
      render(this.#routePoint, this.#pointContainer);

      return;
    }

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#routePoint, prevRoutePoint);
    }

    if(this.#mode === Mode.EDITING) {
      replace(this.#routePoint, prevFormEdit);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevFormEdit);
    remove(prevRoutePoint);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#formEdit.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#formEdit.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#routePoint.shake();

      return;
    }

    const resetFormState = () => {
      this.#formEdit.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#formEdit.shake(resetFormState);
  }

  #handleCloseForm = (point) => {
    this.#formEdit.reset(point);
    this.#replaceFormToPoint();
  };

  #handleFormDeleteClick = (update) => {
    this.#handleDataChange(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      update,
    );

    document.removeEventListener('keydown', this.#onEditFormKeydown);
  };

  #handleFormSubmit = (update) => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      update,
    );
  };

  destroy() {
    remove(this.#formEdit);
    remove(this.#routePoint);
  }

  #onEditFormKeydown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.#formEdit.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#formEdit, this.#routePoint);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
    document.addEventListener('keydown', this.#onEditFormKeydown);
  }

  #replaceFormToPoint() {
    replace(this.#routePoint, this.#formEdit);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#onEditFormKeydown);
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#formEdit.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }
}
