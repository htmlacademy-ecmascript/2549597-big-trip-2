import {remove, render, RenderPosition} from '../framework/render.js';
import FormEdit from '../view/form-edit.js';
import {UserAction, UpdateType} from '../constants.js';
import { isEscKey } from '../utils/utils.js';

export default class NewPointPresenter {
  #pointContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #destinationModel = null;
  #offerModel = null;

  constructor({pointContainer, onDataChange, onDestroy, destinationModel, offerModel}) {
    this.#pointContainer = pointContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new FormEdit({
      point: {
        type: 'flight',
        price: 0,
      },
      destination: this.#destinationModel,
      offer: this.#offerModel,
      onSubmit: this.#handleFormSubmit,
      onFormDeleteClick: this.#handleDeleteClick,
      onCloseForm: this.#handleDeleteClick,
    });

    render(this.#pointEditComponent, this.#pointContainer.querySelector('.trip-events__list'), RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);

    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();

      this.destroy();
    }
  };
}
