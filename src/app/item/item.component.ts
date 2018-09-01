import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';

import { MatSnackBar } from '@angular/material';

import { ActivatedRoute } from '@angular/router';

import { IItemResponse } from './../shared/interfaces/item.interface';
import { IFormResponse } from './../shared/interfaces/form.interface';
import { IFieldResponse } from './../shared/interfaces/field.interface';
import { IOptionResponse } from './../shared/interfaces/option.interface';

import { SINGLE_ITEM_ADD, SINGLE_ITEM_EDIT, SINGLE_ITEM_GET, SINGLE_ITEM_REMOVE } from '../store/item/item.actions';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public dataReady: boolean = false;
  public formReady: boolean = false;
  @Input() public itemID: string = "";
  @Input() public item: IItemResponse;
  public form: IFormResponse;
  public oldForm: IFormResponse = { id: 'id', fields: [] };
  public showOldForm: boolean = false;
  public firstSave: boolean = false;
  public fieldArrayCopy: Array<IFieldResponse>;
  public optionArrayCopy: Array<IOptionResponse>;
  public noItemError: boolean = true;
  private emptyItem = {
    address: 'Item Display Name',
    addressID: undefined,
    score: 0,
    form: this.form,
    formid: ''
  };
  private maxPoints;
  private currentPoints;
  private selectedValues;

  constructor(
    private route: ActivatedRoute,
    public store: Store<IAppState>,
    public snackBar: MatSnackBar,
  ) {
    this.route.params.subscribe(params => {
      this.itemID = params['addressid'];
    });
    this.store.select('form').subscribe(form => { this.form = form; });
    if (!this.form) {
      if (localStorage.getItem('form')) {
        const storedForm = localStorage.getItem('form');
        this.form = JSON.parse(storedForm).form;
        this.emptyItem.form = this.form;
        this.emptyItem.formid = this.form.id;
        this.formReady = true;
      }
    }
    else {
      this.form = this.form["form"];
      this.emptyItem.form = this.form;
      this.emptyItem.formid = this.form.id;
      this.formReady = true;
    }
  }

  ngOnInit() {
    if (this.route.snapshot.params.addressid) {
      this.checkReady();
    }
    else {
      this.noItemError = false;
      this.firstSave = true;
      if (this.formReady) {
        this.item = this.emptyItem;
        if (this.item.form.fields) {
          this.fieldArrayCopy = this.item.form.fields;
          this.fieldArrayCopy.sort(function (a, b) { return a.order - b.order });
          this.item.form.fields = this.fieldArrayCopy;
        }
        this.dataReady = true;
      }
    }
  }

  public onDataEmitted(data) {
    this.form = data;
    if (!data || !data.length) {
      this.formReady = false;
    }
    else {
      this.formReady = true;
    }
  }

  checkReady(): void {
    if (this.formReady && this.item) {
      this.fieldArrayCopy = this.item.form.fields;
      this.fieldArrayCopy.sort(function (a, b) { return a.order - b.order });
      this.item.form.fields = this.fieldArrayCopy;
    }
    else {
      this.getItem(this.route.snapshot.params.addressid);
    }
  }

  put(): void {
    this.store.dispatch({
      type: SINGLE_ITEM_EDIT,
      payload: this.item
    });
  }

  post(): void {
    this.store.dispatch({
      type: SINGLE_ITEM_ADD,
      payload: this.item
    });
    this.firstSave = false;
  }

  getItem(id: string): void {
    // Get request /api/item/:addressid with itemID
    // this.item = response; this.form = this.item.form;
    this.store.dispatch({
      type: SINGLE_ITEM_GET,
      payload: id
    });
    this.store.select('single_item').subscribe(data => {
      if (data['single_item']) {
        if (data['single_item'].toString()) {
          this.item = data['single_item'];
          if (this.item.hasOwnProperty("form")) {
            this.dataReady = true;
            this.noItemError = false;
          }
        }
      }
    });
  }

  saveItem(): void {
    this.calcScore(this.item.form.fields);
    setTimeout(this.put(), 10000);
    this.snackBar.open('Item saved!', 'Close', {
      duration: 4000
    });
  }

  newItem(): void {
    this.item.addressID = encodeURI(this.item.address);
    this.calcScore(this.item.form.fields);
    setTimeout(this.post(), 10000);
    this.snackBar.open('Item added!', 'Close', {
      duration: 4000
    });
  }

  deleteItem(): void {
    this.store.dispatch({
      type: SINGLE_ITEM_REMOVE,
      payload: this.item.addressID
    });
    this.snackBar.open('Item removed.', 'Close', {
      duration: 4000
    });
    this.noItemError = true;
  }

  calcScore(fields: Array<IFieldResponse>): void {
    this.maxPoints = 0;
    this.currentPoints = 0;
    this.selectedValues = 0;
    if (fields) {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].disabled) {
          //Skip
        }
        else if (fields[i].type === "checkbox") {
          this.optionArrayCopy = fields[i].options;
          for (let j = 0; j < this.optionArrayCopy.length; j++) {
            if (this.optionArrayCopy[j].value) {
              // seems like this isn't being hit
              this.selectedValues = this.selectedValues + 1;
            }
            // each option to check has a max value of one point
            this.maxPoints = this.maxPoints + (fields[i].multiplier || 0);
          }
          this.currentPoints = this.currentPoints + (this.selectedValues * (fields[i].multiplier || 0));
        }
        else if (fields[i].type === "text" || fields[i].type === "switch") {
          if (fields[i].value) {
            this.currentPoints = this.currentPoints + (fields[i].multiplier || 0);
            this.maxPoints = this.maxPoints + (fields[i].multiplier || 0);
          }
        }
        else {
          this.currentPoints = this.currentPoints + (fields[i].value * (fields[i].multiplier || 0));
          this.maxPoints = this.maxPoints + (fields[i].maxValue * (fields[i].multiplier || 0));
        }
      }
      if (!this.maxPoints || this.maxPoints === 0) {
        this.item.score = 0;
      }
      else {
        this.item.score = (this.currentPoints / this.maxPoints) * 100;
        this.item.score = parseInt(this.item.score.toFixed(0));
      }
    }
  }

  replaceForm(): void {
    this.oldForm = this.item.form;
    this.showOldForm = true;
    this.item.form = this.form;
  }

}
