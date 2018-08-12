import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';

import { ActivatedRoute } from '@angular/router';

import { IItemResponse } from './../shared/interfaces/item.interface';
import { IFormResponse } from './../shared/interfaces/form.interface';
import { IFieldResponse } from './../shared/interfaces/field.interface';
import { IOptionResponse } from './../shared/interfaces/option.interface';

import { ITEM_ADD, ITEM_EDIT, ITEM_GET, ITEM_REMOVE } from '../store/item/item.actions';

import { Observable } from 'rxjs/Observable';
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
  private emptyItem = {
    address: 'Item Display Name',
    addressID: undefined,
    score: 0,
    form: this.form,
    formid: ''
  };

  constructor(private route: ActivatedRoute, public store: Store<IAppState>) {
    this.route.params.subscribe(params => {
      this.itemID = params['addressid'];
      console.log(this.itemID);
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
      this.item = this.emptyItem;
      this.getItem(this.route.snapshot.params.addressid);
      this.firstSave = false;
      this.dataReady = true;
      console.log("pre timeout");
      setTimeout(function () {
        console.log("timeout called");
        if (this.formReady && this.dataReady && this.item) {
          this.fieldArrayCopy = this.item.form.fields;
          this.fieldArrayCopy.sort(function (a, b) { return a.order - b.order });
          this.item.form.fields = this.fieldArrayCopy;
          console.log("timeout fields sorted");
        }
      }, 5000);
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
    console.log(this.form);
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

  getItem(id: string): void {
    // Get request /api/item/:addressid with itemID
    // this.item = response; this.form = this.item.form;
    console.log("Item get payload:");
    console.log(id);
    this.store.dispatch({
      type: ITEM_GET,
      payload: id
    });
    this.store.select('item').subscribe(data => this.item = data);
    setTimeout(function () { this.item = this.item["item"]; }, 3000); // wait three seconds for this.item to update
    this.dataReady = true;
  }

  put(): void {
    console.log("Item put payload:");
    console.log(this.item);
    this.store.dispatch({
      type: ITEM_EDIT,
      payload: this.item
    });
  }

  post(): void {
    console.log("Item post payload:");
    console.log(this.item);
    this.store.dispatch({
      type: ITEM_ADD,
      payload: this.item
    });
    this.firstSave = false;
  }

  saveItem(): void {
    console.log("save Item", this.item);
    this.calcScore(this.item.form.fields);
    setTimeout(this.put(), 3000);
  }

  newItem(): void {
    console.log("new Item", this.item);
    this.item.addressID = encodeURI(this.item.address);
    this.calcScore(this.item.form.fields);
    setTimeout(this.post(), 3000);
  }

  deleteItem(): void {
    console.log("Item remove payload:");
    console.log(this.item);
    this.store.dispatch({
      type: ITEM_REMOVE,
      payload: this.item
    });
    this.firstSave = true;
  }

  calcScore(fields: Array<IFieldResponse>): void {
    console.log("calculateScore called");
    let maxPoints = 0;
    let currentPoints = 0;
    let selectedValues = 0;
    if (fields) {
      for (let i = 0; i > fields.length; i++) {
        if (fields[i].type === "checkbox") {
          this.optionArrayCopy = fields[i].options;
          for (let j = 0; j > this.optionArrayCopy.length; j++) {
            if (this.optionArrayCopy[j].value) {
              selectedValues = selectedValues + 1;
            }
          }
          currentPoints = currentPoints + (selectedValues * fields[i].multiplier);
          maxPoints = maxPoints + (selectedValues * fields[i].multiplier);
        }
        else if (fields[i].type === "text" || fields[i].type === "switch") {
          if (fields[i].value) {
            currentPoints = currentPoints + fields[i].multiplier;
            maxPoints = maxPoints + fields[i].multiplier;
          }
        }
        else {
          currentPoints = currentPoints + (fields[i].value * fields[i].multiplier);
          maxPoints = maxPoints + (fields[i].maxValue * fields[i].multiplier);
        }
      }
      if (maxPoints = 0) {
        this.item.score = 0;
      }
      else {
        this.item.score = (currentPoints / maxPoints) * 100;
      }
      console.log("score after calcScore", this.item.score);
    }
  }

}
