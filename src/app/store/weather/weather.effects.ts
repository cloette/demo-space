import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';

import {
  WEATHER_GET, AIR_QUALITY_GET, WEATHER_DATA_GET, WeatherGet,
  WeatherAirQuality, WeatherDataGet, WeatherAirQualitySuccess, WeatherAirQualityFail, WeatherGetSuccess, WeatherGetFail,
  WeatherDataGetSuccess, WeatherDataGetFail
} from './weather.actions';

@Injectable()
export class WeatherEffects {

  @Effect()
  init$ = this.actions$
    .ofType(WEATHER_GET)
    .mergeMap((action: WeatherGet) => {

      return Observable.concat(
        Observable.of(new WeatherAirQuality(action.payload)),
        Observable.of(new WeatherDataGet(action.payload))
      );
    });

  constructor(private actions$: Actions) {}
}
