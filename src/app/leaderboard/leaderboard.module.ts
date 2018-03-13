import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LeaderboardComponent } from './leaderboard.component';
import { routes } from './leaderboard.router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LeaderboardComponent
  ],
  bootstrap: [
    LeaderboardComponent
  ]
})
export class FormModule {}
