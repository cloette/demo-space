import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FormModule } from './form/form.module';
import { ItemModule } from './item/item.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';


export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { loadChildren: () => FormModule, path: 'form' },
  { loadChildren: () => ItemModule, path: 'item' },
  { loadChildren: () => LeaderboardModule, path: 'leaderboard' },
  { path: 'callback', component: HomeComponent },
  { path: '**', redirectTo: 'home' }
];
