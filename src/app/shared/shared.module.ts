import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule
} from '@angular/material';

import { ModalComponent, ModalDirectivesDirective } from './modal/modal.component';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { ButtonComponent } from './button/button.component';
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
    ButtonComponent,
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
  providers: [AuthService],
  exports: [
    ModalComponent,
    ModalDirectivesDirective,
    TopNavigationComponent,
    LoaderComponent,
    CardComponent,
    ButtonComponent,
    InputComponent,
    NotesComponent
  ]
})
export class SharedModule {}
