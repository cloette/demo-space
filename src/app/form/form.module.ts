import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form.component';
import { Dialog } from './dialog/dialog.component';
import { routes } from './form.router';

import {
  MatIconModule,
  MatIconRegistry,
  MatButtonModule,
  MatRippleModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatFormFieldModule,
  MatFormFieldControl,
  MatSlideToggleModule,
  MatDialogModule
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
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  declarations: [
    FormComponent,
    Dialog
  ],
  providers: [MatIconRegistry],
  bootstrap: [
    FormComponent,
    Dialog
  ]
})
export class FormModule { }
