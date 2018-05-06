import { IFormResponse } from './../../shared/interfaces/form.interface';
import { Action } from '@ngrx/store';
import { Jsonp } from '@angular/http';

export const FORM_ADD = '[Form] add new';
export const FORM_ADD_FAIL = '[Form] add new fail';
export const FORM_ADD_SUCCESS = '[Form] add new success';

export const FORM_EDIT = '[Form] edit';
export const FORM_EDIT_FAIL = '[Form] edit fail';
export const FORM_EDIT_SUCCESS = '[Form] edit success';

export const FORM_GET = '[Form] get';
export const FORM_GET_FAIL = '[Form] get fail';
export const FORM_GET_SUCCESS = '[Form] get success';

/*
export const FORM_REMOVE = '[Form] remove';
export const FORM_REMOVE_FAIL = '[Form] remove fail';
export const FORM_REMOVE_SUCCESS = '[Form] remove success';*/

/* Form Add */
export class FormAdd implements Action {
  readonly type = FORM_ADD;

  constructor(public payload: string) {}
}

export class FormAddSuccess implements Action {
  readonly type = FORM_ADD_SUCCESS;

  constructor(public payload: any) {}
}

export class FormAddFail implements Action {
  readonly type = FORM_ADD_FAIL;

  constructor(public payload: any) {}
}

/* Form Edit */
export class FormEdit implements Action {
  readonly type = FORM_EDIT;

  constructor(public payload: IFormResponse) {}
}

export class FormEditSuccess implements Action {
  readonly type = FORM_EDIT_SUCCESS;

  constructor(public payload: any) {}
}

export class FormEditFail implements Action {
  readonly type = FORM_EDIT_FAIL;

  constructor(public payload: any) {}
}

/* Form Get */
export class FormGet implements Action {
  readonly type = FORM_GET;

  constructor(public payload: string) {}
}

export class FormGetSuccess implements Action {
  readonly type = FORM_GET_SUCCESS;

  constructor(public payload: any) {}
}

export class FormGetFail implements Action {
  readonly type = FORM_GET_FAIL;

  constructor(public payload: any) {}
}

/* Form Remove
export class FormRemove implements Action {
  readonly type = FORM_REMOVE;

  constructor(public payload: string) {}
}

export class FormRemoveSuccess implements Action {
  readonly type = FORM_REMOVE_SUCCESS;

  constructor(public payload: IFormResponse) {}
}

export class FormRemoveFail implements Action {
  readonly type = FORM_REMOVE_FAIL;

  constructor(public payload: string) {}
}*/

export type Actions =
  | FormAdd
  | FormAddSuccess
  | FormAddFail
  | FormEdit
  | FormEditSuccess
  | FormEditFail
  | FormGet
  | FormGetSuccess
  | FormGetFail
