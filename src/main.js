import Presenter from './presenter/presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';
import {render} from './framework/render.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';

const siteHeader = document.querySelector('.page-header');
const newBtnContainer = document.querySelector('.trip-main__trip-controls');
const siteFilterContainer = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-body__page-main');
const siteSortingContainer = siteMain.querySelector('.trip-events');
const pointModel = new PointModel();
const destinationModel = new DestinationModel();
const offerModel = new OfferModel();
const filterModel = new FilterModel();
const presenter = new Presenter({container: siteSortingContainer, pointModel, destinationModel, offerModel, filterModel, onNewPointDestroy: handleNewPointFormClose});//, onNewPointDestroy: handleNewPointFormClose});
const filterPresenter = new FilterPresenter({filterContainer: siteFilterContainer, filterModel, pointModel});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}
function handleNewPointButtonClick() {
  presenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, newBtnContainer, 'afterend');

filterPresenter.init();
presenter.init();
