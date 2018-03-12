import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IFormResponse } from './../shared/interfaces/form.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public firstVisit: boolean = true;
  public showFormIDField: boolean = false;
  public dataReady: boolean = false;
  public formID: string = '';
  public form: Observable<IFormResponse>;

  constructor() { }

  updateFormID(id: string): void{
    this.formID = id;
    this.firstVisit = false;
    this.getForm(id);
  }

  toggle(thing): void{
    thing = !thing;
  }

  makeBlankForm(id: string): void {
    // Post to /api/form/:id with supplied id 
    // or the user's id (in sessionStorage)
    if (id === ""){
      let user = sessionStorage.getItem('user');
      // post request with user.id
      this.formID = user;
    }
    else {
      this.formID = id;
      // post request with id
    }
  }

  getForm(id:string): void {
    if (id === ""){
      let user = sessionStorage.getItem('user');
      // get request with user.id
      this.formID = user;
    }
    else {
      this.formID = id;
      // get request with id
    }
  }

  saveForm(): void {
    // Put to /api/form/:id with this.formID
  }

  ngOnInit() {
  }

}
