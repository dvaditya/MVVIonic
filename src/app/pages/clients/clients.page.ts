import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/models/auth/user.model';
import { ClientService } from './clients.service';
import { ClientModel } from 'src/app/shared/models/clients/client.model';
import { Helper } from 'src/app/shared/helpers/helper';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  public clientList: ClientModel[] = [];
  public currentUser: User;
  public isPageLoading: boolean;

  constructor(private authService: AuthService,
              public clientService: ClientService,
              public helperClass: Helper) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.isPageLoading = true;
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.getClients();
  }

  getClients() {
    this.clientService.getClients()
    .subscribe(data => {
      this.clientList = data;
      this.clientList.forEach(client => {
        client.phone = this.helperClass.formatPhoneNumber(client.phone);
        client.directionsURL = this.helperClass.getAddressURL(client);
      });
      this.isPageLoading = false;
    },
    error => {
      console.log(error);
    });
  }

}
