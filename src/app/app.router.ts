import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { loadChildren: 'form/form.module#FormModule', path: 'form' },
  { loadChildren: 'item/item.module#ItemModule', path: 'item' },
  { loadChildren: 'leaderboard/leaderboard.module#LeaderboardModule', path: 'leaderboard' },
  { path: 'callback', component: HomeComponent },
  { path: '**', redirectTo: 'home' }
];
