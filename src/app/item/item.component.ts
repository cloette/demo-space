import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';

import { ActivatedRoute } from '@angular/router';

import { IItemResponse } from './../shared/interfaces/item.interface';
import { IFormResponse } from './../shared/interfaces/form.interface';

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
  public itemID: string;
  public item: Observable<IItemResponse>;
  public form: any;

  constructor(private route: ActivatedRoute, store: Store<IAppState>) {
    this.route.params.subscribe(params => {
      this.itemID = params['addressid'];
    });
    this.form = store.select('form');
   }

  getItem(id: string): void {
    // Get request /api/item/:addressid with itemID
    // this.item = response; this.form = this.item.form;
    this.dataReady = true;
  }

  saveItem(): void {
    // PUT request /api/item with this.item.addressid
    // Form input should be a shared store thing
  }

  ngOnInit() {
    if (this.route.snapshot.params.addressid !== ""){
      this.getItem(this.route.snapshot.params.addressid);
    }
    else{
      this.dataReady = true;
    }
  }

}
