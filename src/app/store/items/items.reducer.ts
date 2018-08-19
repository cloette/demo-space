import {
  ITEMS_GET_SUCCESS,
  Actions
} from './items.actions';

import { IItemsResponse } from './../../shared/interfaces/items.interface';

/* Revisit this later and compare */

export function itemsReducer(state: IItemsResponse = {all: []}, action: Actions): IItemsResponse {

  switch (action.type) {

    case ITEMS_GET_SUCCESS:
      console.log("ITEMS_GET_SUCCESS", JSON.stringify(action.payload));
      return Object.assign({}, state, {
        items: action.payload
      });

    default:
      return state;
  }
}
