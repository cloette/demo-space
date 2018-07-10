import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
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
export class ItemComponent implements OnInit, OnChanges {

  public dataReady: boolean = false;
  public formReady: boolean = false;
  @Input() public itemID: string = "";
  @Input() public item: any;// Observable<IItemResponse>
  public form: IFormResponse;
  public firstSave: boolean = false;
  private payload;
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
    setTimeout(this.put(), 3000);
  }

  newItem(): void {
    console.log("new Item", this.item);
    this.item.addressID = encodeURI(this.item.address);
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

  ngOnInit() {
    if (this.route.snapshot.params.addressid) {
      this.getItem(this.route.snapshot.params.addressid);
      this.firstSave = false;
      if (this.formReady && this.item) {
        /*this.item.fields.slice.call(this.item.fields).sort(function(a, b) {
          return b.order - a.order;
        });*/
        this.dataReady = true;
      }
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

  ngOnChanges(changes: SimpleChanges) {
    console.log("calculateScore called");
    let maxPoints = 0;
    let currentPoints = 0;
    let selectedValues = 0;
    if (this.item.form.fields) {
      this.fieldArrayCopy = this.item.form.fields;
      for (let i = 0; i > this.fieldArrayCopy.length; i++) {
        if(this.fieldArrayCopy[i].type === "checkbox"){
          this.optionArrayCopy = this.fieldArrayCopy[i].options;
          for(let j = 0; j > this.optionArrayCopy.length; j++){
            if(this.optionArrayCopy[j].value){
              selectedValues = selectedValues + 1;
            }
          }
          currentPoints = currentPoints + (selectedValues * this.fieldArrayCopy[i].multiplier);
          maxPoints = maxPoints + (selectedValues * this.fieldArrayCopy[i].multiplier);
        }
        else if (this.fieldArrayCopy[i].type === "text" || this.fieldArrayCopy[i].type === "switch"){
          if (this.fieldArrayCopy[i].value){
            currentPoints = currentPoints + this.fieldArrayCopy[i].multiplier;
            maxPoints = maxPoints + this.fieldArrayCopy[i].multiplier;
          }
        }
        else{
          currentPoints = currentPoints + (this.fieldArrayCopy[i].value * this.fieldArrayCopy[i].multiplier);
          maxPoints = maxPoints + (this.fieldArrayCopy[i].maxValue * this.fieldArrayCopy[i].multiplier);
        }
      }
      this.item.score = (currentPoints / maxPoints) * 100;
      console.log("score after calcScore", this.item.score);
    }
  }

}
