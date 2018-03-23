import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { routes } from './app.router';
import { metaReducers, reducers } from './store';
import { SharedModule } from './shared/shared.module';
import { FormEffects } from './store/form/form.effects';
import { ItemEffects } from './store/item/item.effects';
import { ItemsEffects } from './store/items/items.effects';
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      FormEffects,
      ItemEffects,
      ItemsEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    RouterModule.forRoot(
      routes,
      {
        useHash: false
      }
    )
  ],
  providers: [AuthService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
