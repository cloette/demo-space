import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {
  FORM_ADD, FORM_GET, FORM_EDIT,
  FormAdd, FormAddFail, FormAddSuccess,
  FormEdit, FormEditFail, FormEditSuccess,
  FormGet, FormGetFail, FormGetSuccess,
} from './form.actions';
import { IFormResponse } from '../../shared/interfaces/form.interface';

@Injectable()
export class FormEffects {

  @Effect()
  addForm$ = this.actions$
    .ofType(FORM_ADD)
    .switchMap((action: FormAdd) => {

      return this.http.post<IFormResponse>(`/api/form/${action.payload}`, action.payload)
        .catch((error) => Observable.of(new FormAddFail(error)))
        .map((response: any) => new FormAddSuccess(response));
    });

  @Effect()
  editForm$ = this.actions$
    .ofType(FORM_EDIT)
    .switchMap((action: FormEdit) => {
      return this.http.put<IFormResponse>(`/api/form`, action.payload)
        .catch((error) => Observable.of(new FormEditFail(error)))
        .map((response: any) => new FormEditSuccess(response));
    });

  @Effect()
  getForm$ = this.actions$
    .ofType(FORM_GET)
    .switchMap((action: FormGet) => {

      return this.http.get<IFormResponse>(`/api/form/${action.payload}`)
        .catch((error) => Observable.of(new FormGetFail(error)))
        .map((response: any) => new FormGetSuccess(response));
    });
/*
  @Effect()
  removeForm$ = this.actions$
    .ofType(FORM_REMOVE)
    .switchMap((action: FormRemove) => {

      return this.http.delete<IFormResponse>('/api/form/${action.payload.id}', action.payload)
        .catch((error) => Observable.of(new FormRemoveFail(error)))
        .map((response: any) => new FormRemoveSuccess(response));

    });*/

  constructor(private actions$: Actions, private http: HttpClient) {}
}
