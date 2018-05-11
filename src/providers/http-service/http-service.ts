import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation, GeolocationOptions, PositionError } from '@ionic-native/geolocation';

import { Observable } from 'rxjs/Rx';
import { RequestItem } from './request_item';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
  lon: Number;
  lat: Number;

  constructor(public http: HttpClient, private geolocation: Geolocation) {
    this._getGeolocation();
  }

  private _getGeolocation() {

console.log("hogehoge");

    let options: GeolocationOptions = {
      enableHighAccuracy: false
    };
    this.geolocation.getCurrentPosition(options).then((resp)=> {
      console.log("lon  : ", resp.coords.longitude);
      console.log("lat  : ", resp.coords.latitude);
      this.lon = resp.coords.longitude;
      this.lat = resp.coords.latitude;

    }, (err : PositionError) => {
      console.log("error : ", err.message);
    });

  }

  postData(time, uuid, isStartTime) {

    console.log("time : ", time);
    console.log("uuid : ", uuid);
    console.log("isStartTime  : ", isStartTime);
    console.log("lon : ", this.lon);
    console.log("lat : ", this.lat);

    let url:string = 'http://192.168.10.6:3000/attendances';
    const params = {
      account_uuid: uuid,
      time: time,
      latitude: this.lon,
      longitude: this.lat,
      type: isStartTime ? 'attending' : 'leaving'
    };

    return hoge = this.http.post(url, params);
  }
}
