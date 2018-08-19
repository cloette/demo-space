import { IItemResponse } from './../../shared/interfaces/item.interface';
import { Action } from '@ngrx/store';

export const SINGLE_ITEM_ADD = '[Item] add new';
export const SINGLE_ITEM_ADD_FAIL = '[Item] add new fail';
export const SINGLE_ITEM_ADD_SUCCESS = '[Item] add new success';

export const SINGLE_ITEM_EDIT = '[Item] edit';
export const SINGLE_ITEM_EDIT_FAIL = '[Item] edit fail';
export const SINGLE_ITEM_EDIT_SUCCESS = '[Item] edit success';

export const SINGLE_ITEM_GET = '[Item] get';
export const SINGLE_ITEM_GET_FAIL = '[Item] get fail';
export const SINGLE_ITEM_GET_SUCCESS = '[Item] get success';

export const SINGLE_ITEM_REMOVE = '[Item] remove';
export const SINGLE_ITEM_REMOVE_FAIL = '[Item] remove fail';
export const SINGLE_ITEM_REMOVE_SUCCESS = '[Item] remove success';

/* ITEM Add */
export class ItemAdd implements Action {
  readonly type = SINGLE_ITEM_ADD;

  constructor(public payload: string) {}
}

export class ItemAddSuccess implements Action {
  readonly type = SINGLE_ITEM_ADD_SUCCESS;

  constructor(public payload: any) {}
}

export class ItemAddFail implements Action {
  readonly type = SINGLE_ITEM_ADD_FAIL;

  constructor(public payload: string) {}
}

/* ITEM Edit */
export class ItemEdit implements Action {
  readonly type = SINGLE_ITEM_EDIT;

  constructor(public payload: string) {}
}

export class ItemEditSuccess implements Action {
  readonly type = SINGLE_ITEM_EDIT_SUCCESS;

  constructor(public payload: any) {}
}

export class ItemEditFail implements Action {
  readonly type = SINGLE_ITEM_EDIT_FAIL;

  constructor(public payload: string) {}
}

/* Item Get */
export class ItemGet implements Action {
  readonly type = SINGLE_ITEM_GET;

  constructor(public payload: string) {}
}

export class ItemGetSuccess implements Action {
  readonly type = SINGLE_ITEM_GET_SUCCESS;

  constructor(public payload: any) {}
}

export class ItemGetFail implements Action {
  readonly type = SINGLE_ITEM_GET_FAIL;

  constructor(public payload: string) {}
}

/* Item Remove */
export class ItemRemove implements Action {
  readonly type = SINGLE_ITEM_REMOVE;

  constructor(public payload: string) {}
}

export class ItemRemoveSuccess implements Action {
  readonly type = SINGLE_ITEM_REMOVE_SUCCESS;

  constructor(public payload: any) {}
}

export class ItemRemoveFail implements Action {
  readonly type = SINGLE_ITEM_REMOVE_FAIL;

  constructor(public payload: string) {}
}

export type Actions =
  | ItemAdd
  | ItemAddSuccess
  | ItemAddFail
  | ItemEdit
  | ItemEditSuccess
  | ItemEditFail
  | ItemGet
  | ItemGetSuccess
  | ItemGetFail
  | ItemRemove
  | ItemRemoveSuccess
  | ItemRemoveFail
