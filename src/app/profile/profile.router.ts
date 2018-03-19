import { Route } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const routes: Route[] = [
  {
    path: '',
    component: ProfileComponent
  }
  /*{
    path: 'edit',
    component: EditComponent,
    outlet: 'modal'
  }*/
];
