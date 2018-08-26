import {
  FORM_EDIT_SUCCESS,
  FORM_GET_SUCCESS,
  FORM_ADD_SUCCESS,
  Actions
} from './form.actions';

import { IFormResponse } from './../../shared/interfaces/form.interface';

/* Revisit this later and compare */

export function formReducer(state: IFormResponse, action: Actions): IFormResponse {

  switch (action.type) {

    case FORM_ADD_SUCCESS:

      return state;

    case FORM_EDIT_SUCCESS:

      return state;

    case FORM_GET_SUCCESS:

      return Object.assign({}, state, {
        form: action.payload
      });

    /*case FORM_REMOVE_SUCCESS:

      return state.filter((formToRemove: IFormResponse) => action.payload !== formToRemove.id);
*/
    default:
      return state;
  }
}
