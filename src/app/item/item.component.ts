import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';

import { ActivatedRoute } from '@angular/router';

import { IItemResponse } from './../shared/interfaces/item.interface';
import { IFormResponse } from './../shared/interfaces/form.interface';

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
  private emptyItem = {
    address: 'Item Display Name',
    addressID: undefined,
    score: 0,
    form: this.form
  };

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {
    this.route.params.subscribe(params => {
      this.itemID = params['addressid'];
      console.log(this.itemID);
    });
    this.store.select('form').subscribe(form => { this.form = form["form"]; });
    if (!this.form){
      if (localStorage.getItem('form')){
        const storedForm = localStorage.getItem('form');
        this.form = JSON.parse(storedForm).form;
        this.emptyItem.form = this.form;
        this.formReady = true;
      }
    }
  }

  public onDataEmitted(data){
    this.form = data;
    if(!data || !data.length){
      this.formReady = false;
    }
    else {
      this.formReady = true;
    }
  }

  getItem(id: string): void {
    // Get request /api/item/:addressid with itemID
    // this.item = response; this.form = this.item.form;
    this.payload = {
      addressid: id,
      form: this.form
    }
    console.log("Item get payload:");
    console.log(this.payload);
    this.store.dispatch({
      type: ITEM_GET,
      payload: this.payload
    });
    this.store.select('item').subscribe(data => this.item = data);
    this.dataReady = true;
  }

  saveItem(): void {
    // PUT request /api/item with this.item.addressid
    this.calculateScore();
    console.log("Item Put payload:");
    console.log(this.item);
    this.store.dispatch({
      type: ITEM_EDIT,
      payload: this.item
    });
  }

  newItem(): void {
    this.item.addressID = encodeURI(this.item.address);
    this.calculateScore();
    console.log("Item post payload:");
    console.log(this.item);
    this.store.dispatch({
      type: ITEM_ADD,
      payload: this.item
    });
    this.firstSave = false;
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
    let maxPoints = 0;
    let currentPoints = 0;
    let score = 0;
    if (this.item.form.fields.length > 0) {
      for (let i = 0; i > this.item.form.fields.length; i++) {
        currentPoints = currentPoints + (this.item.form.fields[i].value * this.item.form.fields[i].multiplier);
        maxPoints = maxPoints + (this.item.form.fields[i].maxValue * this.item.form.fields[i].multiplier);
      }
    }
    if (maxPoints === 0) {
      this.item.score = 0;
    }
    else {
      score = (currentPoints / maxPoints) * 100;
      this.item.score = score;
    }
  }

  ngOnInit() {
    if (this.route.snapshot.params.addressid) {
      this.getItem(this.route.snapshot.params.addressid);
    }
    else {
      this.firstSave = true;
      if (this.formReady){
        this.item = this.emptyItem;
        this.dataReady = true;
      }
    }
    console.log(this.form);
  }

}
