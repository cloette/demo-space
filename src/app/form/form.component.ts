import { Component, OnInit, Inject } from '@angular/core';
import { IAppState } from '../store/index';
import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material';

import { Dialog } from './dialog/dialog.component';

import { IFormResponse } from './../shared/interfaces/form.interface';
import { IFieldResponse } from './../shared/interfaces/field.interface';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { FORM_ADD, FORM_EDIT, FORM_GET } from '../store/form/form.actions';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export interface result {
  result: Object;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // TODO: Add accordions as the question editor. Keep it simple.

  public firstVisit: boolean = true;
  public showFormIDField: boolean = false;
  public showSpecificFormField: boolean = false;
  public dataReady: boolean = false;
  public formID: string = undefined;
  public form: IFormResponse;
  public fields;
  public profile;
  public newField: IFieldResponse;

  public id = new FormControl;
  public sid = new FormControl;
  public newFieldForm: FormGroup;

  constructor(
    public store: Store<IAppState>,
    public fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.profile = localStorage.getItem('profile');
    this.store.select('form').subscribe(form => { this.form = form; });
    if (localStorage.getItem('form')){
      const storedForm = localStorage.getItem('form');
      this.form = JSON.parse(storedForm);
    }
  }

  toggle1(): void {
    this.showFormIDField = !this.showFormIDField;
  }
  toggle2(): void {
    this.showSpecificFormField = !this.showSpecificFormField;
  }

  updateFormID(): void {
    this.getForm(this.id.value);
    this.firstVisit = false;
  }
  makeSpecificForm(): void {
    // Post to /api/form/:id with supplied id
    // or the user's id
    this.formID = this.sid.value;
    console.log("make specific form " + this.formID);
    this.makeBlankForm();
  }

  loadFormOptions(): void{
    this.firstVisit = true;
    this.dataReady = false;
  }

  getTypeIcon(fieldType: string) {
    if (fieldType === "text") {
      return 'title';
    }
    else if (fieldType === "radio") {
      return 'radio_button_checked';
    }
    else if (fieldType === "checkbox") {
      return 'check_box';
    }
    else if (fieldType === "switch") {
      return 'toll';
    }
    else if (fieldType === "select") {
      return 'arrow_drop_down_circle';
    }
    else {
      return 'help';
    }
  }

  makeBlankForm(): void {
    // Post to /api/form/:id with supplied id
    // or the user's id
    if (this.formID === undefined) {
      console.log("Form new payload:");
      console.log(this.profile);
      this.store.dispatch({
        type: FORM_ADD,
        payload: this.profile
      });
      this.getForm(this.profile);
    }
    else {
      console.log("Form new payload:");
      console.log(this.formID);
      this.store.dispatch({
        type: FORM_ADD,
        payload: this.formID
      });
      this.getForm(this.formID);
    }
  }

  getForm(id: any): void {
    console.log("Form get payload");
    if (id === undefined || id === '') {
      console.log(this.profile);
      this.store.dispatch({
        type: FORM_GET,
        payload: this.profile
      });
    }
    else {
      this.formID = id;
      // get request with id
      console.log(this.formID);
      this.store.dispatch({
        type: FORM_GET,
        payload: id
      });
    }
    this.firstVisit = false;
    this.store.select('form').subscribe(form => { this.form = form; localStorage.setItem('form', JSON.stringify(this.form)); });
    this.fields = this.form.fields;
    this.dataReady = true;
  }

  saveForm(): void {
    // Put to /api/form/:id with this.form (contains id)
    console.log("saveForm " + this.formID, this.fields);
    this.store.dispatch({
      type: FORM_EDIT,
      payload: { id: this.formID, fields: this.fields }
    })
  }

  clearForm(): void {
    console.log("clearForm " + this.formID);
    this.store.dispatch({
      type: FORM_EDIT,
      payload: { id: this.formID, fields: [] }
    })
  }

  removeField(index: number): void {
    this.fields.splice(index, 1);
  }

  replaceField(someField: IFieldResponse, index: number): void {
    this.fields[index] = someField;
  }

  addField(): void {
    if (this.form) {
      this.fields.push(this.newField);
      console.log("Fields Array", this.fields);
    }
  }

  openDialog(someField: IFieldResponse, index: number, newField: boolean): void {
    console.log(someField);
    let dialogRef = this.dialog.open(Dialog, {
      width: '400px',
      data: {
        order: someField.order,
        type: someField.type,
        question: someField.question,
        options: someField.options,
        multiplier: someField.multiplier,
        maxValue: someField.maxValue,
        disabled: someField.disabled,
        value: someField.value
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log("Dialog closed without saving. Do nothing.")
      }
      else if (!newField) {
        if (!result.result) {
          console.log("Dialog closed without saving. Do nothing.")
        }
        else {
          this.replaceField(result.result, index);
        }
      }
      else {
        if (!result.result) {
          console.log("Dialog closed without saving. Do nothing.")
        }
        else {
          this.newField = result.result;
          this.addField();
        }
      }
    });
  }

  ngOnInit() {
    if (this.form){
      this.formID = this.form.id;
      this.fields = this.form.fields;
      this.firstVisit = false;
      this.dataReady = true;
    }
    if(!this.fields){
      this.fields = [];
    }
    this.newField = {
      order: 1,
      type: 'text',
      question: 'Enter a question',
      options: null,
      multiplier: 0,
      maxValue: 0,
      disabled: false,
      value: 0
    };
  }

}
