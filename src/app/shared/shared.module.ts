import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';

import { AuthService } from './../auth/auth.service';

import {
  MatButtonModule,
  MatRipple,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatFormFieldModule,
  MatFormField,
  MatIconRegistry,
  MatButton,
  MatIcon,
  MatInput,
  MatDialog,
  MatSlideToggle,
  MatCheckbox,
  MatRadioGroup,
  MatRadioButton,
  MatDivider,
  MatAccordion,
  MatList,
  MatListItem,
  MatSelectModule,
} from '@angular/material';

@NgModule({
  declarations: [
    TopNavigationComponent,
    LoaderComponent,
    MatRipple,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatSlideToggle,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    MatDivider,
    MatList,
    MatListItem
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, MatIconRegistry],
  exports: [
    TopNavigationComponent,
    LoaderComponent,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatSlideToggle,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    MatDivider,
    MatList,
    MatListItem
  ]
})
export class SharedModule { }
