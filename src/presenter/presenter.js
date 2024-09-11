import FormEdit from '../view/form-edit.js';
import RouteListPoints from '../view/points-list-view.js';
import RoutePoint from '../view/point-view.js';
import {render} from '../render.js';

const POINTS = 3;

export default class Presenter {
  routeListPoints = new RouteListPoints();
  formEdit = new FormEdit();

  constructor ({container}) {
    this.container = container;
  }

  init() {
    render(this.formEdit, this.container);
    render(this.routeListPoints, this.container);

    for (let i = 0; i < POINTS; i++) {
      render(new RoutePoint(), this.routeListPoints.getElement());
    }
  }
}
