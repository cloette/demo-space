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

  private maxPoints;
  private currentPoints;
  private selectedValues;
  private optionArrayCopy;

  constructor(public store: Store<IAppState>) {
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
    console.log("checkItems:", this.items);
    this.items = this.items["items"];
    if (this.items) {
      this.sortItems();
      this.warning = null;
    }
    else {
      this.warning = "There are no items! Make some items first.";
      this.items = [];
      this.dataReady = true;
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
      this.checkItemsReady();
    });
  }

  sortItems(): void {
    console.log("Sorting items", this.items);
    if (this.items) {
      if (this.descending) {
        this.descending = !this.descending;
        this.items.sort(function(a, b){return b.score - a.score});
      }
      else {
        this.items.sort(function(a, b){return a.score - b.score});
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
    for (let j=0; j < this.items.length; j++){
      this.items[j].score = this.calcScore(this.items[j]);
    }
    this.sortItems();
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  calcScore(item: IItemResponse) {
    this.maxPoints = 0;
    this.currentPoints = 0;
    this.selectedValues = 0;
    if (item.form.fields) {
      for (let i = 0; i < item.form.fields.length; i++) {
        if (item.form.fields[i].disabled) {
          console.log('field is disabled, not scored');
        }
        else if (item.form.fields[i].type === "checkbox") {
          this.optionArrayCopy = item.form.fields[i].options;
          for (let j = 0; j > this.optionArrayCopy.length; j++) {
            if (this.optionArrayCopy[j].value) {
              this.selectedValues = this.selectedValues + 1;
            }
          }
          this.currentPoints = this.currentPoints + (this.selectedValues * (item.form.fields[i].multiplier || 0));
          this.maxPoints = this.maxPoints + (this.selectedValues * (item.form.fields[i].multiplier || 0));
        }
        else if (item.form.fields[i].type === "text" || item.form.fields[i].type === "switch") {
          if (item.form.fields[i].value) {
            this.currentPoints = this.currentPoints + (item.form.fields[i].multiplier || 0);
            this.maxPoints = this.maxPoints + (item.form.fields[i].multiplier || 0);
          }
        }
        else {
          this.currentPoints = this.currentPoints + (item.form.fields[i].value * (item.form.fields[i].multiplier || 0));
          this.maxPoints = this.maxPoints + (item.form.fields[i].maxValue * (item.form.fields[i].multiplier || 0));
        }
      }
      if (!this.maxPoints) {
        item.score = 0;
      }
      else {
        item.score = (this.currentPoints / this.maxPoints) * 100;
        item.score = parseInt(item.score.toFixed(0));
      }
    }
    return item.score;
  }

  ngOnInit() {
    if (this.formReady && !this.dataReady) {
      this.getItems();
    }
  }

}
