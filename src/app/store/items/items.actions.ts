import { IItemResponse } from './../../shared/interfaces/item.interface';
import { Action } from '@ngrx/store';

export const ITEMS_GET = '[Item] get';
export const ITEMS_GET_FAIL = '[Item] get fail';
export const ITEMS_GET_SUCCESS = '[Item] get success';

/* Item Get */
export class ItemsGet implements Action {
  readonly type = ITEMS_GET;

  constructor(public payload: string) {}
}

export class ItemsGetSuccess implements Action {
  readonly type = ITEMS_GET_SUCCESS;

  constructor(public payload: IItemResponse[]) {}
}

export class ItemsGetFail implements Action {
  readonly type = ITEMS_GET_FAIL;

  constructor(public payload: string) {}
}

export type Actions =
  | ItemsGet
  | ItemsGetSuccess
  | ItemsGetFail
