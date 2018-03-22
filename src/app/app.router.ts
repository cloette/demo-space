import { Route } from '@angular/router';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'form'},
  { loadChildren: 'app/form/form.module#FormModule', path: 'form' },
  { loadChildren: 'app/item/item.module#ItemModule', path: 'item' },
  { loadChildren: 'app/leaderboard/leaderboard.module#LeaderboardModule', path: 'leaderboard' },
  { path: 'callback', redirectTo: 'form' },
  { path: '**', redirectTo: 'form' }
];
