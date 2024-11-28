import Presenter from './presenter/presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';
import {render} from './framework/render.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointApiService from './points-api-service.js';
import OfferApiService from './offers-api-service.js';
import DestinationApiService from './destinations-api-service.js';

const AUTHORIZATION = 'Basic fe2mg530wpear2kltfd';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteHeader = document.querySelector('.page-header');
const destinationContainer = document.querySelector('.trip-main');
const newBtnContainer = document.querySelector('.trip-main__trip-controls');
const siteFilterContainer = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-body__page-main');
const siteSortingContainer = siteMain.querySelector('.trip-events');
const pointModel = new PointModel({pointApiService: new PointApiService(END_POINT, AUTHORIZATION)});
const destinationModel = new DestinationModel({destinationApiService: new DestinationApiService(END_POINT, AUTHORIZATION)});
const offerModel = new OfferModel({offersApiService: new OfferApiService(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();
const presenter = new Presenter({container: siteSortingContainer, pointModel, destinationModel, offerModel, filterModel, onNewPointDestroy: handleNewPointFormClose, priceContainer: newBtnContainer, destinationContainer: destinationContainer});
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

filterPresenter.init();
presenter.init();
offerModel.init();
destinationModel.init();
pointModel.init()
  .finally(() => {
    render(newPointButtonComponent, newBtnContainer, 'afterend');
  });
