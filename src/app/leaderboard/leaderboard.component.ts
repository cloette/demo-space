import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';
import { Route } from '@angular/router';

import { IItemResponse } from './../shared/interfaces/item.interface';
import { IFormResponse } from './../shared/interfaces/form.interface';

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
  public items: Array<IItemResponse>;
  public form;//: Observable<IFormResponse>;

  constructor( store: Store<IAppState>) { 
    this.form = store.select('form');
  }

  getItems(): void {
    // Get request /api/item/ with this.item.addressid
    // ! need to send request.body.form so only items with our form appear.
    // sort the response in descending order, flippable?
    // this.items = response
    this.dataReady = true;
  }

  sort(): void{
    if (this.descending){
      this.descending = !this.descending;
      this.items.sort(function(a, b) {
        return a.score - b.score;
      });
    }
    else{
      this.items.sort(function(a, b) {
        return b.score - a.score;
      });
    }
  }

  ngOnInit() {
    this.getItems();
  }

}
