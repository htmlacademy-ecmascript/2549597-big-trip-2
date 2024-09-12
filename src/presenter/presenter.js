import FormEdit from '../view/form-edit.js';
import RouteListPoints from '../view/points-list-view.js';
import RoutePoint from '../view/point-view.js';
import {render} from '../render.js';

export default class Presenter {
  routeListPoints = new RouteListPoints();
  formEdit = new FormEdit();

  constructor ({container, model}) {
    this.container = container;
    this.model = model;
  }

  init() {
    this.destination = this.model.getPoint();
    render(this.formEdit, this.container);
    render(this.routeListPoints, this.container);

    for (let i = 0; i < this.destination.length; i++) {
      render(new RoutePoint({destination: this.destination}), this.routeListPoints.getElement());
    }
  }
}
