import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'home', component: HomeComponent}
  { path: 'callback', pathMatch: 'full', component: CallbackComponent },
  { loadChildren: 'app/form/form.module#FormModule', path: 'form' },
  { loadChildren: 'app/item/item.module#ItemModule', path: 'item' },
  { loadChildren: 'app/leaderboard/leaderboard.module#LeaderboardModule', path: 'leaderboard' },
  { path: '**', redirectTo: 'home' }
];
