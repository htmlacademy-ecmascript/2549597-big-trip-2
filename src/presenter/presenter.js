import FormEdit from '../view/form-edit.js';
import RouteListPoints from '../view/points-list-view.js';
import RoutePoint from '../view/point-view.js';
import {render} from '../render.js';

const ELEMENT_NUMBER = 3;
export default class Presenter {
  routeListPoints = new RouteListPoints();


  constructor ({container, pointModel, destinationModel, offerModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.destinationModel = destinationModel;
    this.offerModel = offerModel;
  }

  init() {
    this.point = [...this.pointModel.getPoint()];

    render(new FormEdit({point: this.point(ELEMENT_NUMBER),
      destination: this.destinationModel.getDestinationById(this.point[ELEMENT_NUMBER].id),
      offer: this.offerModel.getOffersByType(this.point[ELEMENT_NUMBER].type)
    }), this.container);
    render(this.routeListPoints, this.container);

    for (let i = 0; i < this.point.length; i++) {
      render(new RoutePoint({point: this.point[i],
        destination: this.destinationModel.getDestinationById(this.point[i].id),
        offer: this.offerModel.getOffersByType(this.point[i].type)
      }), this.routeListPoints.getElement());
    }
  }
}
