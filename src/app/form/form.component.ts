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
  public formID: string = undefined;
  public form: Store<IFormResponse[]>;
  public fields: Array<IFieldResponse>;
  private payload;
  private profile;

  constructor(public store: Store<IAppState>) {
    this.profile = localStorage.getItem('profile');
  }

  updateFormID(id: string): void{
    this.firstVisit = false;
    this.getForm(id);
  }

  toggle(): void{
    this.showFormIDField = !this.showFormIDField;
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
    // or the user's id
    if (this.formID === undefined){
      this.store.dispatch({
        type: FORM_ADD,
        payload: this.profile
      });
      this.getForm(this.profile);
    }
    else {
      this.getForm(this.formID);
    }
  }

  getForm(id:any): void {
    if (id === undefined){
      this.store.dispatch({
        type: FORM_GET,
        payload: this.profile
      });
    }
    else {
      this.formID = id;
      // get request with id
      this.store.dispatch({
        type: FORM_GET,
        payload: id
      });
    }
    this.form = this.store.select('form');
    this.dataReady = true;
  }

  saveForm(): void {
    // Put to /api/form/:id with this.formID
    this.store.dispatch({
      type: FORM_EDIT,
      payload: this.form[0]
    })
  }

  ngOnInit() {
  }

}
