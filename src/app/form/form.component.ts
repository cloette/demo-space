import { Component, OnInit } from '@angular/core';
import { IAppState } from '../store/index';
import { Store } from '@ngrx/store';

import { IFormResponse } from './../shared/interfaces/form.interface';
import { IFieldResponse } from './../shared/interfaces/field.interface';

import { FORM_ADD, FORM_EDIT, FORM_GET} from '../store/form/form.actions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // TODO: Add accordions as the question editor. Keep it simple.

  public firstVisit: boolean = true;
  public showFormIDField: boolean = false;
  public dataReady: boolean = false;
  public formID: string = '';
  public form;//: Observable<IFormResponse>;
  public fields: Array<IFieldResponse>;
  private payload;

  constructor(public store: Store<IAppState>) {
  }

  updateFormID(id: string): void{
    this.firstVisit = false;
    this.getForm(id);
  }

  toggle(thing): void{
    thing = !thing;
  }

  getTypeIcon(fieldType:string){
    if (fieldType === "text"){
      return 'text format';
    }
    else if (fieldType === "radio"){
      return 'radio button checked';
    }
    else if (fieldType === "checkbox"){
      return 'check box';
    }
    else if (fieldType === "switch"){
      return 'toll';
    }
    else {
      return 'error';
    }
  }

  makeBlankForm(): void {
    // Post to /api/form/:id with supplied id
    // or the user's id (in sessionStorage)
    if (this.formID === ""){
      let user = sessionStorage.getItem('user');
      // post request with user.id
      this.payload = { id: user, fields: [] };
      this.store.dispatch({
        type: FORM_ADD,
        payload: this.payload
      });
      this.getForm("");
    }
    else {
      this.getForm(this.formID);
    }
  }

  getForm(id:string): void {
    if (id === ""){
      let user = sessionStorage.getItem('user');
      // get request with user.id
      this.form.id = user;
      this.store.dispatch({
        type: FORM_GET,
        payload: this.form
      });
    }
    else {
      this.formID = id;
      // get request with id
      this.store.dispatch({
        type: FORM_GET,
        payload: this.form
      });
    }
    this.form = this.store.select('form');
    this.dataReady = true;
  }

  saveForm(): void {
    // Put to /api/form/:id with this.formID
    this.store.dispatch({
      type: FORM_EDIT,
      payload: this.form
    })
  }

  ngOnInit() {
  }

}
