import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/models/auth/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public currentUser: User;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

}
