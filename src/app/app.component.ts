import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { IAppState } from './store';

import { IFormResponse } from './shared/interfaces/form.interface';
import { IFieldResponse } from './shared/interfaces/field.interface';
import { IItemResponse } from './shared/interfaces/item.interface';
import { IOptionResponse } from './shared/interfaces/option.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  observable1$: Observable<IFormResponse>;
  observable2$: Observable<IItemResponse>;
  observable3$: Observable<IItemResponse[]>;
  public profile;

  constructor(public auth: AuthService, private store: Store<IAppState>, private http: HttpClient) {
    this.profile = localStorage.getItem('profile');
  }

  ngOnInit() {
    this.observable1$ = this.http.post<IFormResponse>('/api/form', { id: this.profile } );
    console.log("App component fired");
  }
}
