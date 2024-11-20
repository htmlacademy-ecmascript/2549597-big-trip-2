import dayjs from 'dayjs';
import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointApiService extends ApiService {
  get points() {
    return this._load({url: 'points'}).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': point.price,
      'date_from': point.timeStart ? dayjs(point.timeStart).toISOString() : null,
      'date_to': point.timeEnd ? dayjs(point.timeEnd).toISOString() : null,
      'is_favorite': point.isFavorite,
      'destination': point.destinationId,
    };

    delete adaptedPoint.price;
    delete adaptedPoint.timeStart;
    delete adaptedPoint.timeEnd;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.destinationId;

    return adaptedPoint;
  }
}
