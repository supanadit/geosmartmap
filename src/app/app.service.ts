import { Injectable } from '@angular/core';
import { Marker } from 'leaflet';
import { Observable } from 'rxjs';
import {
  LocationModel,
  locationModelFromEventSource,
  markerListFromLocationModel,
} from './model/location';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  getStreamUser(): Observable<Array<Marker>> {
    return new Observable((observer) => {
      const source = new EventSource(
        'https://api.geosmart.supanadit.com/point/get/stream'
      );
      source.addEventListener('message', (message) => {
        const listLocationModel: Array<LocationModel> =
          locationModelFromEventSource(message);
        observer.next(markerListFromLocationModel(listLocationModel));
      });
    });
  }
}
