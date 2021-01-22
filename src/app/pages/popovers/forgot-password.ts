import { Component, OnInit } from '@angular/core';

import { PopoverController, NavParams } from '@ionic/angular';

@Component({
    template: `
      <ion-card>
    <ion-card-header class="titlebar"><span>MVV Login</span></ion-card-header>
    <div class="labelFont-light ion-margin-top">
      <span class="margin-left-3">Please enter your credentials to login to the system.</span>
    </div>
    <ion-card-content class="padding-right-0 padding-left-0 padding-top-0">
      <ion-list lines="none">
        <ion-item>
          <ion-label class="labelFont-bold" position="stacked">Account <ion-text color="danger">*</ion-text></ion-label>
          <ion-input class="input-text" required type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label class="labelFont-bold" position="stacked">Login <ion-text color="danger">*</ion-text></ion-label>
          <ion-input class="input-text" required type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label  class="labelFont-bold" position="stacked">Password <ion-text color="danger">*</ion-text></ion-label>
          <ion-input class="input-text" required type="password"></ion-input>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
  `
})

export class ForgotPasswordPage implements OnInit {
    public company: string;
    public login: string;

    constructor(public popoverCtrl: PopoverController,
                public navParams: NavParams) { }

    ngOnInit() {
        this.company = this.navParams.data.company;
        this.login = this.navParams.data.login;
    }

    close() {
        this.popoverCtrl.dismiss();
      }
}
