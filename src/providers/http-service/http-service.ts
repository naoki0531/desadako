import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation, GeolocationOptions, PositionError } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { RequestItem } from './request_item.ts';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  constructor(public http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello HttpServiceProvider Provider');
  }

  private _serverError(err: any) {
    console.log('sever error:', err);
    if(err instanceof Response) {
      return Observable.throw(err.json().message || 'データ取得エラー');
    }
    return Observable.throw(err || 'データ取得エラー');
  }

  getHoge(time, key): Observable<RequestItem[]>{

    console.log("time : ", time);
    console.log("key  : ", key);

    let options: GeolocationOptions = {
      enableHighAccuracy: this.enableHighAccuracy
    };
    this.geolocation.getCurrentPosition(options).then((resp)=> {
      console.log("lon  : ", resp.coords.longitude);
      console.log("lat  : ", resp.coords.latitude);
    }, (err : PositionError) => {
      console.log("error : ", err.message);
    });

    var url:string = 'http://localhost:3330';
    return this.http.get(url)
      .map(res => <Array<QiitaItem>>res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError);
  }

}
