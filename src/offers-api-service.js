import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class OfferApiService extends ApiService {
  get offers() {
    return this._load({url: 'offers'}).then(ApiService.parseResponse);
  }

  async updateOffer(offer) {
    const response = await this._load({
      url: 'offers',
      method: Method.PUT,
      body: JSON.stringify(offer),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  // #adaptToServer(point) {
  //   const adaptedPoint = {
  //     ...point,
  //     'base_price': point.price,
  //     'date_from': point.timeStart instanceof Date ? point.timeStart.toISOString() : null,
  //     'date_to': point.timeEnd instanceof Date ? point.timeEnd.toISOString() : null,
  //     'is_favorite': point.isFavorite,
  //     'destination': point.destinationId,
  //   };

  //   delete adaptedPoint.price;
  //   delete adaptedPoint.timeStart;
  //   delete adaptedPoint.timeEnd;
  //   delete adaptedPoint.isFavorite;
  //   delete adaptedPoint.destinationId;

  //   return adaptedPoint;
  // }
}
