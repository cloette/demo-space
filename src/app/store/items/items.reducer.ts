import {
  ITEMS_GET_SUCCESS,
  Actions
} from './items.actions';

import { IItemResponse } from './../../shared/interfaces/item.interface';

/* Revisit this later and compare */

export function itemsReducer(state: IItemResponse[] = [], action: Actions): IItemResponse[] {

  switch (action.type) {

    case ITEMS_GET_SUCCESS:
      console.log("items", action.payload);
      return Object.assign({}, state, {
        items: action.payload
      });

    default:
      return state;
  }
}
