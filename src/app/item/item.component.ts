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
  public firstSave: boolean = false;
  public fieldArrayCopy: Array<IFieldResponse>;
  public optionArrayCopy: Array<IOptionResponse>;
  public noItemError: boolean = false;
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
    console.log("checkReady called", this.item);
    if (this.formReady && this.item) {
      this.fieldArrayCopy = this.item.form.fields;
      this.fieldArrayCopy.sort(function (a, b) { return a.order - b.order });
      this.item.form.fields = this.fieldArrayCopy;
      console.log("timeout fields sorted");
    }
    else {
      this.getItem(this.route.snapshot.params.addressid);
    }
  }

  put(): void {
    console.log("Item put payload:");
    console.log(this.item);
    this.store.dispatch({
      type: SINGLE_ITEM_EDIT,
      payload: this.item
    });
  }

  post(): void {
    console.log("Item post payload:");
    console.log(this.item);
    this.store.dispatch({
      type: SINGLE_ITEM_ADD,
      payload: this.item
    });
    this.firstSave = false;
  }

  getItem(id: string): void {
    // Get request /api/item/:addressid with itemID
    // this.item = response; this.form = this.item.form;
    console.log("Item get payload:");
    console.log(id);
    this.store.dispatch({
      type: SINGLE_ITEM_GET,
      payload: id
    });
    this.store.select('single_item').subscribe(data => {
      console.log("store single_item", data);
      if (data && data.toString() && data['single_item'].toString()) {
        this.item = data['single_item'];
        console.log("valid item!", this.item);
        this.dataReady = true;
        this.noItemError = false;
      }
      else if(data && data.toString()){
        // got a failure msg
        this.noItemError = true;
      }
    });
  }

  saveItem(): void {
    console.log("save Item", this.item);
    this.calcScore(this.item.form.fields);
    setTimeout(this.put(), 10000);
    this.snackBar.open('Item saved!', 'Close', {
      duration: 4000
    });
  }

  newItem(): void {
    console.log("new Item", this.item);
    this.item.addressID = encodeURI(this.item.address);
    this.calcScore(this.item.form.fields);
    setTimeout(this.post(), 10000);
    this.snackBar.open('Item added!', 'Close', {
      duration: 4000
    });
  }

  deleteItem(): void {
    console.log("Item remove payload:");
    console.log(this.item);
    this.store.dispatch({
      type: SINGLE_ITEM_REMOVE,
      payload: this.item
    });
    this.firstSave = true;
    this.snackBar.open('Item removed.', 'Close', {
      duration: 4000
    });
  }

  calcScore(fields: Array<IFieldResponse>): void {
    console.log("calculateScore called", fields);
    this.maxPoints = 0;
    this.currentPoints = 0;
    this.selectedValues = 0;
    if (fields) {
      for (let i = 0; i < fields.length; i++) {
        console.log("field type " + i, fields[i].type);
        if (fields[i].disabled) {
          console.log('field is disabled, not scored');
        }
        else if (fields[i].type === "checkbox") {
          this.optionArrayCopy = fields[i].options;
          for (let j = 0; j < this.optionArrayCopy.length; j++) {
            if (this.optionArrayCopy[j].value) {
              console.log("option array hit");
              // seems like this isn't being hit
              this.selectedValues = this.selectedValues + 1;
            }
            // each option to check has a max value of one point
            this.maxPoints = this.maxPoints + (fields[i].multiplier || 0);
          }
          this.currentPoints = this.currentPoints + (this.selectedValues * (fields[i].multiplier || 0));
          console.log("checkbox hit", this.currentPoints, this.maxPoints, "value", this.selectedValues, "multi", fields[i].multiplier);
        }
        else if (fields[i].type === "text" ) {
          if (fields[i].value) {
            this.currentPoints = this.currentPoints + (fields[i].multiplier || 0);
            this.maxPoints = this.maxPoints + (fields[i].multiplier || 0);
          }
          console.log("text/switch hit", this.currentPoints, this.maxPoints, "multi", fields[i].multiplier);
        }
        else if (fields[i].type === "text" || fields[i].type === "switch") {
          if (fields[i].value) {
            this.currentPoints = this.currentPoints + (fields[i].multiplier || 0);
            this.maxPoints = this.maxPoints + (fields[i].multiplier || 0);
          }
          console.log("text/switch hit", this.currentPoints, this.maxPoints, "multi", fields[i].multiplier);
        }
        else {
          this.currentPoints = this.currentPoints + (fields[i].value * (fields[i].multiplier || 0));
          this.maxPoints = this.maxPoints + (fields[i].maxValue * (fields[i].multiplier || 0));
          console.log("else hit", this.currentPoints, this.maxPoints, "value", fields[i].value);
        }
      }
      if (!this.maxPoints) {
        console.log("MaxPoints is 0 hit");
        this.item.score = 0;
      }
      else {
        console.log("MaxPoints is not 0 hit");
        this.item.score = (this.currentPoints / this.maxPoints) * 100;
        this.item.score = parseInt(this.item.score.toFixed(0));
      }
      console.log("end of if fields", this.item.score);
    }
    console.log("score after calcScore", this.item.score);
  }

}
