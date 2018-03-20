import { IItemResponse } from './../../shared/interfaces/item.interface';
import { Action } from '@ngrx/store';

export const ITEM_ADD = '[Item] add new';
export const ITEM_ADD_FAIL = '[Item] add new fail';
export const ITEM_ADD_SUCCESS = '[Item] add new success';

export const ITEM_EDIT = '[Item] edit';
export const ITEM_EDIT_FAIL = '[Item] edit fail';
export const ITEM_EDIT_SUCCESS = '[Item] edit success';

export const ITEM_GET = '[Item] get';
export const ITEM_GET_FAIL = '[Item] get fail';
export const ITEM_GET_SUCCESS = '[Item] get success';

export const ITEM_REMOVE = '[Item] remove';
export const ITEM_REMOVE_FAIL = '[Item] remove fail';
export const ITEM_REMOVE_SUCCESS = '[Item] remove success';

/* ITEM Add */
export class ItemAdd implements Action {
  readonly type = ITEM_ADD;

  constructor(public payload: string) {}
}

export class ItemAddSuccess implements Action {
  readonly type = ITEM_ADD_SUCCESS;

  constructor(public payload: IItemResponse) {}
}

export class ItemAddFail implements Action {
  readonly type = ITEM_ADD_FAIL;

  constructor(public payload: string) {}
}

/* ITEM Edit */
export class ItemEdit implements Action {
  readonly type = ITEM_EDIT;

  constructor(public payload: string) {}
}

export class ItemEditSuccess implements Action {
  readonly type = ITEM_EDIT_SUCCESS;

  constructor(public payload: IItemResponse) {}
}

export class ItemEditFail implements Action {
  readonly type = ITEM_EDIT_FAIL;

  constructor(public payload: string) {}
}

/* Item Get */
export class ItemGet implements Action {
  readonly type = ITEM_GET;

  constructor(public payload: string) {}
}

export class ItemGetSuccess implements Action {
  readonly type = ITEM_GET_SUCCESS;

  constructor(public payload: IItemResponse) {}
}

export class ItemGetFail implements Action {
  readonly type = ITEM_GET_FAIL;

  constructor(public payload: string) {}
}

/* Item Remove */
export class ItemRemove implements Action {
  readonly type = ITEM_REMOVE;

  constructor(public payload: string) {}
}

export class ItemRemoveSuccess implements Action {
  readonly type = ITEM_REMOVE_SUCCESS;

  constructor(public payload: IItemResponse) {}
}

export class ItemRemoveFail implements Action {
  readonly type = ITEM_REMOVE_FAIL;

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
