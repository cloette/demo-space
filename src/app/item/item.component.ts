import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';

import { ActivatedRoute } from '@angular/router';

import { IItemResponse } from './../shared/interfaces/item.interface';
import { IFormResponse } from './../shared/interfaces/form.interface';

import { ITEM_ADD, ITEM_EDIT, ITEM_GET} from '../store/item/item.actions';

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
  public itemID: string = "";
  public item: any;// Observable<IItemResponse>
  public form: any;
  public firstSave: boolean = false;
  private payload;


  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {
    this.route.params.subscribe(params => {
      this.itemID = params['addressid'];
    });
    this.form = store.select('form');
   }

  getItem(id: string): void {
    // Get request /api/item/:addressid with itemID
    // this.item = response; this.form = this.item.form;
    this.payload = {
      addressid: id,
      form: this.form
    }
    this.store.dispatch({
      type: ITEM_GET,
      payload: this.payload
    });
    this.dataReady = true;
  }

  saveItem(): void {
    // PUT request /api/item with this.item.addressid
    this.store.dispatch({
      type: ITEM_EDIT,
      payload: this.item
    });
  }

  newItem(): void{
    this.item.addressID = encodeURI(this.item.address);
    this.store.dispatch({
      type: ITEM_ADD,
      payload: this.item
    });
    this.firstSave = false;
  }

  ngOnInit() {
    if (this.route.snapshot.params.addressid !== ""){
      this.getItem(this.route.snapshot.params.addressid);
    }
    else{
      this.firstSave = true;
      this.newItem();
      this.dataReady = true;
    }
  }

}
