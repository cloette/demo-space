import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { IAppState } from './store';
import { USER_GET } from './store/profile/profile.actions';
import { ISimpleResponse } from './shared/interfaces/simple.interface';
import { IFormResponse } from './shared/interfaces/form.interface';
import { IFieldResponse } from './shared/interfaces/field.interface';
import { IItemResponse } from './shared/interfaces/item.interface';
import { IOptionResponse } from './shared/interfaces/option.interface';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  observable$: Observable<IFormResponse>;
  observable1$: Observable<IFieldResponse>;
  observable2$: Observable<IItemResponse>;
  observable3$: Observable<IOptionResponse>;
  observable4$: Observable<ISimpleResponse>;

  constructor(private http: HttpClient, private store: Store<IAppState>, public auth: AuthService) {}

  ngOnInit() {

    /*this.observable$ = this.http.post<IFormResponse>('/api/form/form', null);*/

    /*console.log(this.observable$);*/

    /*this.observable$ = this.http.get<ISimpleResponse>('/api/public/simple');*/

    /*this.store.dispatch({
      type: USER_GET
    });*/
  }
}
