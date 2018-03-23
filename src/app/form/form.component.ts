import { Component, OnInit, Inject } from '@angular/core';
import { IAppState } from '../store/index';
import { Store } from '@ngrx/store';

import {MatDialog} from '@angular/material';

import {Dialog} from './dialog/dialog.component';

import { IFormResponse } from './../shared/interfaces/form.interface';
import { IFieldResponse } from './../shared/interfaces/field.interface';

import { FormBuilder, FormGroup } from '@angular/forms';

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
  public form: Store<IFormResponse>;
  public fields: Array<IFieldResponse>;
  private payload;
  private profile;
  public newField: IFieldResponse;

  public formIDform: FormGroup;
  public newFieldForm: FormGroup;

  constructor(
    public store: Store<IAppState>,
    public fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.profile = localStorage.getItem('profile');
    console.log("Profile: ",this.profile);
  }

  updateFormID(): void{
    this.firstVisit = false;
    this.getForm(this.formIDform.get('id').value);
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
    else if (fieldType === "select"){
      return 'mat select arrow';
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
    if (id === undefined || id === ''){
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
    // Put to /api/form/:id with this.form (contains id)
    this.store.dispatch({
      type: FORM_EDIT,
      payload: this.form
    })
  }

  removeField(index:number): void {
    this.fields.splice(index, 1);
  }

  replaceField(someField: IFieldResponse, index:number): void {
    this.fields[index] = someField;
  }

  addField(): void {
    if (this.form){
      this.fields.push(this.newField);
    }
  }

  openDialog(someField: IFieldResponse, index: number, newField: boolean): void {
    let dialogRef = this.dialog.open(Dialog, {
      width: '400px',
      data: {
        order: someField.order,
        type: someField.type,
        question: someField.question,
        options: someField.options,
        multiplier: someField.multiplier,
        maxValue: someField.maxValue,
        disabled: someField.disabled
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!newField){
        let formattedResult = result;
        formattedResult.maxValue = parseInt(formattedResult.maxValue);
        formattedResult.multiplier = parseInt(formattedResult.multiplier);
        formattedResult.order = parseInt(formattedResult.order);
        this.replaceField(formattedResult, index);
      }
      else {
        this.newField = result;
        this.newField.maxValue = parseInt(result.maxValue);
        this.newField.multiplier = parseInt(result.multiplier);
        this.newField.order = parseInt(result.order);
        this.addField();
      }
    });
  }

  ngOnInit() {
    this.formIDform = this.fb.group({
      'id': ['']
    });
  }

}
