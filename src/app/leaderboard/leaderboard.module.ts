import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LeaderboardComponent } from './leaderboard.component';
import { routes } from './leaderboard.router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    LeaderboardComponent
  ],
  bootstrap: [
    LeaderboardComponent
  ]
})
export class LeaderboardModule {}
