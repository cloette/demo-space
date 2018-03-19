import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatIconRegistry
} from '@angular/material';

import { ModalComponent, ModalDirectivesDirective } from './modal/modal.component';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { LoaderComponent } from './loader/loader.component';

import { AuthService } from './../auth/auth.service';

@NgModule({
  declarations: [
    ModalComponent,
    TopNavigationComponent,
    ModalDirectivesDirective,
    CardComponent,
    LoaderComponent,
    InputComponent,
    NotesComponent
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
    ModalComponent,
    ModalDirectivesDirective,
    TopNavigationComponent,
    LoaderComponent,
    CardComponent,
    InputComponent,
    NotesComponent
  ]
})
export class SharedModule {}
