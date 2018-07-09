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
  public items: Array<IItemResponse>;
  public form: IFormResponse;
  public warning: string;
  private payload;

  constructor(private http: HttpClient, public store: Store<IAppState>) {
    this.store.select('form').subscribe(form => { this.form = form; });
    this.store.select('items').subscribe(items => { this.items = items; });
    if (!this.form) {
      if (localStorage.getItem('form')) {
        const storedForm = localStorage.getItem('form');
        this.form = JSON.parse(storedForm).form; // see if that makes a diff
        this.formReady = true;
      }
    }
    else {
      this.form = this.form["form"];
      this.formReady = true;
    }
    if (!this.items) {
      if (localStorage.getItem('items')) {
        const storedItems = localStorage.getItem('items');
        this.items = JSON.parse(storedItems); // see if that makes a diff
        this.checkItemsReady();
      }
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

  checkItemsReady(): void {
    if (this.items) {
      this.items = this.items["items"];
      this.sortItems();
    }
    else {
      this.warning = "There are no items! Make some items first."
    }
  }

  getItems(): void {
    // Get request /api/item/all with this.form.id
    // sort the response in descending order, flippable
    console.log("Items get payload:");
    console.log(this.form.id);
    this.store.dispatch({
      type: ITEMS_GET,
      payload: this.form["id"]
    });
    this.store.select('items').subscribe(data => {
      this.items = data;
      localStorage.setItem('items', JSON.stringify(data));
    });
    setTimeout(this.checkItemsReady(), 3000); // wait three seconds for this.item to update
  }

  sortItems(): void {
    if (this.items) {
      console.log("Sorting items", this.items);
      if (this.descending) {
        this.descending = !this.descending;
        this.items.slice.call(this.items).sort(function (a, b) {
          return a.score - b.score;
        });
      }
      else {
        this.items.slice.call(this.items).sort(function (a, b) {
          return b.score - a.score;
        });
      }
    }
    this.dataReady = true;
  }

  recalculateAllScores(): void {
    // Right now, you have to click into each item
    // and re-save to get an updated score if you
    // disable a field or change a multiplier.
    // This function should cycle through each item and recalc scores
    // Also probably should save that to local storage since we're not re-saving each item
    // Although that could be done
    this.sortItems();
  }

  ngOnInit() {
    if (this.formReady) {
      this.getItems();
    }
    console.log(this.form);
  }

}
