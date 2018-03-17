import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';
import { Route } from '@angular/router';

import { IItemResponse } from './../shared/interfaces/item.interface';
import { IFormResponse } from './../shared/interfaces/form.interface';

import { HttpClient } from '@angular/common/http';

import { ITEM_GET } from '../store/item/item.actions';

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
  public descending: boolean = true;
  public items;//Array<IItemResponse>;
  public form;//: Observable<IFormResponse>;
  private payload;

  constructor( private http: HttpClient, private store: Store<IAppState>) {
    this.form = store.select('form');
  }

  getItems(): void {
    // Get request /api/item/ with this.item.addressid
    // sort the response in descending order, flippable?
    // this.items = response
    this.payload = {
      form: this.form
    }
    this.items = this.http.get<IItemResponse[]>('/api/item', this.payload);
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
    this.getItems();
  }

}
