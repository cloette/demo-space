import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioGroup, MatSlideToggle } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { ItemComponent } from './item.component';
import { routes } from './item.router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatRadioButton,
    MatRadioGroup,
    MatSlideToggle
  ],
  declarations: [
    ItemComponent
  ],
  schemas: [
    MatRadioButton,
    MatRadioGroup,
    MatSlideToggle
  ],
  bootstrap: [
    ItemComponent
  ]
})
export class ItemModule {}
