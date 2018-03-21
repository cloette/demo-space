import { Route } from '@angular/router';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'weather'},
  { loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile' },
  { loadChildren: 'app/weather/weather.module#WeatherModule', path: 'weather' },
  { loadChildren: 'app/form/form.module#FormModule', path: 'form' },
  { path: 'callback', redirectTo: 'weather' },
  { path: '**', redirectTo: 'weather' }
];
