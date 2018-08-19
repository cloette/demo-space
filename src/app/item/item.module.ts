import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ItemComponent } from './item.component';
import { routes } from './item.router';

import {
  MatButtonModule,
  MatRippleModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatOptionModule,
  MatFormFieldModule,
  MatFormFieldControl,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatRadioModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule
  ],
  declarations: [
    ItemComponent
  ],
  bootstrap: [
    ItemComponent
  ]
})
export class ItemModule { }
