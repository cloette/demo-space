import {
  ITEM_EDIT_SUCCESS,
  ITEM_GET_SUCCESS,
  ITEM_ADD_SUCCESS,
  Actions
} from './item.actions';

import { IItemResponse } from './../../shared/interfaces/Item.interface';

/* Revisit this later and compare */

export function itemReducer(state: IItemResponse[] = [], action: Actions): IItemResponse[] {

  switch (action.type) {

    case ITEM_ADD_SUCCESS:

      return Object.assign({}, state, {
        item: action.payload
      });

    case ITEM_EDIT_SUCCESS:

      return Object.assign({}, state, {
        item: action.payload
      });

    case ITEM_GET_SUCCESS:

      return Object.assign({}, state, {
        item: action.payload
      });

    /*case ITEM_REMOVE_SUCCESS:

      return state.filter((itemToRemove: IItemResponse) => action.payload !== itemToRemove.id);
*/
    default:
      return state;
  }
}
