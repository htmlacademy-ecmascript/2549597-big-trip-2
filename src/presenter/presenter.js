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
    this.points = [...this.pointModel.getPoint()];

    render(new FormEdit({point: this.points[ELEMENT_NUMBER],
      destination: this.destinationModel.getDestinationById(this.points[ELEMENT_NUMBER].id),
      offer: this.offerModel.getOffersByType(this.points[ELEMENT_NUMBER].type)
    }), this.container);
    render(this.routeListPoints, this.container);

    this.points.forEach((point) => {
      render(new RoutePoint({point,
        destination: this.destinationModel.getDestinationById(point.id),
        offer: this.offerModel.getOffersByType(point.type)
      }), this.routeListPoints.getElement());
    });
  }
}
