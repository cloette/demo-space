import {
  SINGLE_ITEM_EDIT_SUCCESS,
  SINGLE_ITEM_GET_SUCCESS,
  SINGLE_ITEM_ADD_SUCCESS,
  SINGLE_ITEM_REMOVE_SUCCESS,
  Actions
} from './item.actions';

import { IItemResponse } from './../../shared/interfaces/item.interface';

/* Revisit this later and compare */

export function itemReducer(state: IItemResponse, action: Actions): IItemResponse {

  switch (action.type) {

    case SINGLE_ITEM_ADD_SUCCESS:

      return state;

    case SINGLE_ITEM_EDIT_SUCCESS:

      return state;

    case SINGLE_ITEM_GET_SUCCESS:

      return Object.assign({}, state, {
        single_item: action.payload
      });

    case SINGLE_ITEM_REMOVE_SUCCESS:

      return state;

    default:
      return state;
  }
}
