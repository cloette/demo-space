import { Route } from '@angular/router';

import { FormComponent } from './form/form.component';
import { ItemComponent } from './item/item.component';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'form'},
  { path: 'form', component: FormComponent },
  { path: 'item/:addressid', component: ItemComponent },
  { loadChildren: 'app/dashboard/dashboard.module#DashboardModule', path: 'dashboard' },
  { loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile' },
  { loadChildren: 'app/weather/weather.module#WeatherModule', path: 'weather' },
  { path: 'callback', redirectTo: 'weather' }
];
