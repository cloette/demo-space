import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatIconRegistry
} from '@angular/material';

import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';

import { AuthService } from './../auth/auth.service';

@NgModule({
  declarations: [
    TopNavigationComponent,
    CardComponent,
    LoaderComponent,
    InputComponent,
    FooterComponent
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
    MatCheckboxModule
  ],
  providers: [AuthService, MatIconRegistry],
  exports: [
    TopNavigationComponent,
    LoaderComponent,
    CardComponent,
    InputComponent,
    FooterComponent
  ]
})
export class SharedModule {}
