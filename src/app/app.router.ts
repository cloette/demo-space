import { Route } from '@angular/router';

import { FormComponent } from './form/form.component';
import { ItemComponent } from './item/item.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'form'},
  { path: 'form', component: FormComponent },
  { path: 'item', component: ItemComponent },
  { path: 'item/:addressid', component: ItemComponent },
  { path: 'leaderboard', component: FormComponent },
  { path: 'callback', redirectTo: 'form' }
];
