import {remove, render, RenderPosition} from '../framework/render.js';
import FormEdit from '../view/form-edit.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../constants.js';
import { isEscKey } from '../utils/utils.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #destinationModel = null;
  #offerModel = null;

  constructor({pointListContainer, onDataChange, onDestroy, destinationModel, offerModel}) {
    this.#pointListContainer = pointListContainer;
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

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

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

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,

      {id: nanoid(), ...point},
    );

    this.destroy();
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
