import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';

import { ActivatedRoute } from '@angular/router';

import { IItemResponse } from './../shared/interfaces/item.interface';
import { IFormResponse } from './../shared/interfaces/form.interface';
import { IFieldResponse } from './../shared/interfaces/field.interface';

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
  public itemID: string = "";
  public item: any;// Observable<IItemResponse>
  public form: IFormResponse;
  public firstSave: boolean = false;
  private payload;
  public fieldArrayCopy: Array<IFieldResponse>;
  private emptyItem = {
    address: 'Item Display Name',
    addressID: undefined,
    score: 0,
    form: this.form
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
        this.formReady = true;
      }
    }
    else {
      this.form = this.form["form"];
      this.emptyItem.form = this.form;
      this.formReady = true;
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
    this.calculateScore();
    setTimeout(this.put(), 3000);
  }

  newItem(): void {
    console.log("new Item", this.item);
    this.item.addressID = encodeURI(this.item.address);
    this.calculateScore();
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

  calculateScore(): void {
    console.log("calculateScore");
    let maxPoints = 0;
    let currentPoints = 0;
    let score = 0;
    if (this.item.form.fields) {
      console.log("fieldArrayCopy");
      this.fieldArrayCopy = this.item.form.fields
      for (let i = 0; i > this.fieldArrayCopy.length; i++) {
        currentPoints = currentPoints + (this.fieldArrayCopy[i].value * this.fieldArrayCopy[i].multiplier);
        maxPoints = maxPoints + (this.fieldArrayCopy[i].maxValue * this.fieldArrayCopy[i].multiplier);
        score = (currentPoints / maxPoints) * 100;
      }
    }
    this.item.score = score;
    console.log("item after calcScore", this.item);
  }

  ngOnInit() {
    if (this.route.snapshot.params.addressid) {
      this.getItem(this.route.snapshot.params.addressid);
    }
    else {
      this.firstSave = true;
      if (this.formReady) {
        this.item = this.emptyItem;
        /*this.item.fields.slice.call(this.item.fields).sort(function(a, b) {
          return b.order - a.order;
        });*/
        this.dataReady = true;
      }
    }
    console.log(this.form);
  }

}
