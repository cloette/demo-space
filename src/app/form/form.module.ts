import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form.component';
import { routes } from './form.router';

import {
  MatIconModule,
  MatIconRegistry,
  MatButtonModule,
  MatRippleModule,
  MatInputModule,
  MatFormFieldModule,
  MatFormFieldControl,
  MatSlideToggleModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
  ],
  declarations: [
    FormComponent
  ],
  providers: [MatIconRegistry],
  bootstrap: [
    FormComponent
  ]
})
export class FormModule { }
