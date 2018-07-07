import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';
import { Route } from '@angular/router';

import { IItemResponse } from './../shared/interfaces/item.interface';
import { IFormResponse } from './../shared/interfaces/form.interface';

import { HttpClient } from '@angular/common/http';

import { ITEMS_GET } from '../store/items/items.actions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  public dataReady: boolean = false;
  public formReady: boolean = false;
  public descending: boolean = true;
  public items;//Array<IItemResponse>;
  public form;//: Observable<IFormResponse>;
  private payload;

  constructor( private http: HttpClient, private store: Store<IAppState>) {
    this.store.select('form').subscribe(form => { this.form = form; });
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

  getItems(): void {
    // Get request /api/item/all with this.form.id
    // sort the response in descending order, flippable
    console.log("Items get payload:");
    console.log(this.form.id);
    this.store.dispatch({
      type: ITEMS_GET,
      payload: this.form.id
    });
    this.store.select('items').subscribe(data => this.items = data);
    this.sortItems();
    this.dataReady = true;
  }

  sortItems(): void{
    this.form = this.store.select('item');
    if (this.descending){
      this.descending = !this.descending;
      this.items.slice.call(this.items).sort(function(a, b) {
        return a.score - b.score;
      });
    }
    else{
      this.items.slice.call(this.items).sort(function(a, b) {
        return b.score - a.score;
      });
    }
  }

  ngOnInit() {
    if (this.formReady){
      this.getItems();
    }
  }

}
