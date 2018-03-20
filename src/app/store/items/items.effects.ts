import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {
  ITEMS_GET,
  ItemsGet, ItemsGetFail, ItemsGetSuccess,
} from './items.actions';
import { IItemResponse } from '../../shared/interfaces/item.interface';

@Injectable()
export class ItemsEffects {

  @Effect()
  getItem$ = this.actions$
    .ofType(ITEMS_GET)
    .switchMap((action: ItemsGet) => {

      return this.http.get<IItemResponse[]>('/api/item/${action.payload.formid}')
        .catch((error) => Observable.of(new ItemsGetFail(error)))
        .map((response: IItemResponse[]) => new ItemsGetSuccess(response));
    });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
