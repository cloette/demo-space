import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';

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
  public itemID: string = '';
  public item: Observable<IItemResponse>;
  public form: Observable<IFormResponse>;

  constructor(private route: ActivatedRoute) { }

  getItem(id: string): void {
    // Get request /api/item/:addressid with this.item.addressid
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
