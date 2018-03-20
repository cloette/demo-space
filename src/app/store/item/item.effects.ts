import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {
  ITEM_ADD, ITEM_GET, ITEM_EDIT, ITEM_REMOVE,
  ItemAdd, ItemAddFail, ItemAddSuccess,
  ItemEdit, ItemEditFail, ItemEditSuccess,
  ItemGet, ItemGetFail, ItemGetSuccess,
  ItemRemove, ItemRemoveFail, ItemRemoveSuccess
} from './item.actions';
import { IItemResponse } from '../../shared/interfaces/item.interface';

@Injectable()
export class ItemEffects {

  @Effect()
  addItem$ = this.actions$
    .ofType(ITEM_ADD)
    .switchMap((action: ItemAdd) => {

      return this.http.post<IItemResponse>('/api/item', action.payload)
        .catch((error) => Observable.of(new ItemAddFail(error)))
        .map((response: any) => new ItemAddSuccess(response));
    });

  @Effect()
  editItem$ = this.actions$
    .ofType(ITEM_EDIT)
    .switchMap((action: ItemEdit) => {

      return this.http.put<IItemResponse>('/api/item', action.payload)
        .catch((error) => Observable.of(new ItemEditFail(error)))
        .map((response: any) => new ItemEditSuccess(response));
    });

  @Effect()
  getItem$ = this.actions$
    .ofType(ITEM_GET)
    .switchMap((action: ItemGet) => {

      return this.http.get<IItemResponse>('/api/item')
        .catch((error) => Observable.of(new ItemGetFail(error)))
        .map((response: IItemResponse) => new ItemGetSuccess(response));
    });

  @Effect()
  removeItem$ = this.actions$
    .ofType(ITEM_REMOVE)
    .switchMap((action: ItemRemove) => {

      return this.http.delete<IItemResponse>('/api/item')
        .catch((error) => Observable.of(new ItemRemoveFail(error)))
        .map((response: any) => new ItemRemoveSuccess(response));

    });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
