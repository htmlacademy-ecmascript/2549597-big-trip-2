import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class DestinationApiService extends ApiService {
  get destinations() {
    return this._load({url: 'destinations'}).then(ApiService.parseResponse);
  }

  async updatePoint(destination) {
    const response = await this._load({
      url: `destinations/${destination.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(destination)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(destination) {
    const adaptedPoint = {
      ...destination,
      'name': destination.townName,
      'pictures': destination.photos,
    };

    delete adaptedPoint.townName;
    delete adaptedPoint.photos;

    return adaptedPoint;
  }
}

