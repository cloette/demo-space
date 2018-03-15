import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';

import { AuthService } from './../auth/auth.service';

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatDividerModule,
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
  MatListItem
} from '@angular/material';

@NgModule({
  declarations: [
    TopNavigationComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDividerModule,
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
    MatListItem
  ],
  providers: [AuthService],
  exports: [
    TopNavigationComponent,
    LoaderComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDividerModule,
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
    MatListItem
  ]
})
export class SharedModule {}
