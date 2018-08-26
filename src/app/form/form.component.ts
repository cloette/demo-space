import { Component, OnInit } from '@angular/core';
import { IAppState } from '../store/index';
import { Store } from '@ngrx/store';

import { MatDialog, MatSnackBar } from '@angular/material';

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
  public noSuchForm: boolean = false;

  public id = new FormControl('');
  public sid = new FormControl('');

  constructor(
    public store: Store<IAppState>,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    this.profile = localStorage.getItem('profile');
    this.store.select('form').subscribe(form => { this.form = form; });
    if (!this.form) {
      if (localStorage.getItem('form')) {
        const storedForm = localStorage.getItem('form');
        this.form = JSON.parse(storedForm);
      }
    }
    else {
      this.form = this.form;
    }
  }

  toggle1(): void {
    this.showFormIDField = !this.showFormIDField;
  }
  toggle2(): void {
    this.showSpecificFormField = !this.showSpecificFormField;
  }

  updateFormID(id: any): void {
    this.getForm(id);
    this.firstVisit = false;
  }
  makeSpecificForm(id: any): void {
    // Post to /api/form/:id with supplied id
    // or the user's id
    this.formID = id;
    this.makeBlankForm();
  }

  loadFormOptions(): void {
    this.firstVisit = true;
    this.dataReady = false;
  }

  getTypeIcon(fieldType: string) {
    if (fieldType === "text") {
      return 'title';
    }
    else if (fieldType === "number") {
      return 'looks_one';
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
      this.store.dispatch({
        type: FORM_ADD,
        payload: this.profile
      });
      this.getForm(this.profile);
    }
    else {
      this.store.dispatch({
        type: FORM_ADD,
        payload: this.formID
      });
      this.getForm(this.formID);
    }
  }

  getForm(id: any): void {
    if (id === undefined || id === null || id === '') {
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
    this.firstVisit = false;
    this.store.select('form').subscribe(form => {
      if (form) {
        this.form = form;
        localStorage.setItem('form', JSON.stringify(form));
        this.testForm();
      }
      else {
        this.noSuchForm = true;
        this.dataReady = false;
        this.firstVisit = true;
      }
    });
    // formID and fields need to update here. Somehow.
    //setTimeout(this.testForm(), 3000); // wait three seconds for this.form to update
  }

  saveForm(): void {
    // Put to /api/form/:id with this.form (contains id)
    const savePayload = { id: this.formID, fields: this.fields };
    localStorage.setItem('form', JSON.stringify(savePayload));
    this.store.dispatch({
      type: FORM_EDIT,
      payload: savePayload
    })
    this.snackBar.open('Form saved!', 'Close', {
      duration: 4000
    });
    setTimeout(this.getForm(this.formID), 3000);
  }

  clearForm(): void {
    const clearPayload = { id: this.formID, fields: [] };
    this.store.dispatch({
      type: FORM_EDIT,
      payload: clearPayload
    })
    this.form.fields = [];
    localStorage.setItem('form', JSON.stringify(this.form));
  }

  removeField(index: number): void {
    this.fields.splice(index, 1);
  }

  replaceField(someField: IFieldResponse, index: number): void {
    this.fields[index] = someField;
    this.snackBar.open('Updated field successfully!', 'Close', {
      duration: 4000
    });
  }

  addField(): void {
    if (this.form) {
      this.fields.push(this.newField);
      this.snackBar.open('Field added!', 'Close', {
        duration: 4000
      });
    }
    // reset newField
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

  testForm(): void {
    if (this.form) {
      this.formID = this.form["form"]["id"];
      this.fields = this.form["form"]["fields"];
      this.firstVisit = false;
      this.dataReady = true;
    }
  }

  openDialog(someField: IFieldResponse, index: number, newField: boolean): void {
    let dialogRef = this.dialog.open(Dialog, {
      width: '400px',
      height: '70vh',
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
      }
      else if (!newField) {
        if (!result.result) {
        }
        else {
          this.replaceField(result.result, index);
        }
      }
      else {
        if (!result.result) {
        }
        else {
          this.newField = result.result;
          this.addField();
        }
      }
    });
  }

  ngOnInit() {
    this.testForm();
    if (!this.fields) {
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
