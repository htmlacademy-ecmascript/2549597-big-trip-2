import Filters from './view/filters-view.js';
import Sorting from './view/sorting-view.js';
import FormCreation from './view/form-creation.js';
import Presenter from './presenter/presenter.js';
import {render} from './render.js';

const siteHeader = document.querySelector('.page-header');
const siteFilterContainer = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-body__page-main');
const siteSortingContainer = siteMain.querySelector('.trip-events');
const presenter = new Presenter({container: siteSortingContainer});

render(new Filters(), siteFilterContainer);
render(new Sorting(), siteSortingContainer);

presenter.init();

render(new FormCreation(), siteSortingContainer);

