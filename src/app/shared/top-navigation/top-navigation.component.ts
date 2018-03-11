import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import { AuthService } from './../../auth/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {

  @ViewChild('topnav') topnav: ElementRef;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {}

  toggle() {
    this.topnav.nativeElement.classList.toggle(['responsive']);
  }

}
