import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';

import { AuthService } from './../auth/auth.service';

import { MatIconModule, MatIconRegistry } from '@angular/material';


@NgModule({
  declarations: [
    TopNavigationComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [AuthService, MatIconRegistry],
  exports: [
    TopNavigationComponent,
    LoaderComponent,
  ]
})
export class SharedModule { }
