import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ForgotPasswordPage } from '../popovers/forgot-password';
import { LoginModel } from '../../shared/models/auth/login.model';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { AppService } from '../../services/app.service';
import { TokenStatus } from 'src/app/shared/enums/token-status.enum';
import { EnvironmentSelectionModel } from 'src/app/shared/models/auth/environment.model';
import { environment } from 'src/environments/environment';
import { AppVersionModel } from 'src/app/shared/models/auth/app-version.model';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginPage: boolean;
  public environmentSelectionPage: boolean;
  public cognitoRegistration: boolean;
  public clickInProgress: boolean;
  public biometricEventInProgress: boolean;
  public intervalCheckForAppUpdate: Subscription;
  public intervalCheckForAppUpdateId: Observable<number>;

  public loginModel: LoginModel = new LoginModel();
  public environmentSelectionModel: EnvironmentSelectionModel = new EnvironmentSelectionModel();
  public appVersion: AppVersionModel = new AppVersionModel();

  constructor(public popoverCtrl: PopoverController,
              public authService: AuthService,
              private router: Router,
              public appService: AppService) { }

  ngOnInit() {
    this.checkIfAPIUrlExists();
  }

  // Life cycle hooks
  ionViewWillEnter() {
    this.clickInProgress = false;
    this.biometricEventInProgress = false;
    this.loginModel = new LoginModel();
    this.environmentSelectionModel = new EnvironmentSelectionModel();
    this.appVersion.version = environment.version;
    this.getMobileAppVersion();
    this.startBackGroundIntervals();
  }

  ionViewDidEnter() {
    this.checkUserLogin();
  }

  ionViewWillLeave() {
    this.intervalCheckForAppUpdate.unsubscribe();
  }

  // click events
  onLoginClick(btnClicked) {
    if(btnClicked === 'login') {
      this.clickInProgress = true;
    } else if(btnClicked === 'biometric') {
      this.biometricEventInProgress = true;
    }
    this.authService.login(this.loginModel).pipe(first())
    .subscribe(data => {
      this.router.navigate(['home']);
      return window.dispatchEvent(new CustomEvent('user:login'));
    },
    error => {
      this.clickInProgress = false;
      this.biometricEventInProgress = false;
      console.log(error);
    });
  }

  onEnvSelectionClick() {
    this.clickInProgress = true;
    this.authService.environmentSelection(this.environmentSelectionModel)
    .subscribe(data => {
      console.log(data);
      this.clickInProgress = false;
      localStorage.setItem('api_url', data);
      this.loginPage = true;
      this.environmentSelectionPage = false;
      this.cognitoRegistration = false;
    }, error => {
      this.clickInProgress = false;
      console.log('error');
      console.log(error);
    });
  }

  activateEnvironmentSelPage() {
    localStorage.removeItem('api_url');
    this.loginPage = false;
    this.environmentSelectionPage = true;
    this.cognitoRegistration = false;
  }

  // check events
  checkIfAPIUrlExists() {
    const url = localStorage.getItem('api_url');
    if(url) {
      this.loginPage = true;
      this.environmentSelectionPage = false;
      this.cognitoRegistration = false;
    } else {
      this.loginPage = false;
      this.environmentSelectionPage = true;
      this.cognitoRegistration = false;
    }
  }

  checkUserLogin() {
    const authData = localStorage.getItem('currentUser');
    if(authData) {
      this.authService.checkToken().subscribe((data: number) => {
        console.log(data);
        if(data !== TokenStatus.invalid) {
          this.router.navigate(['home']);
        } else {
          this.authService.logout(false);
        }
      }, (error: Error) => {
        this.authService.logout(false);
        console.log(error);
      });
    }
  }

  getMobileAppVersion() {
    this.appService.getAppVersion().subscribe(
      (res: {version: string, errorString: string}) => {
        if(res.version !== environment.version) {
          this.appVersion.showError = true;
          this.appVersion.errorString = res.errorString;
        } else {
          this.appVersion.showError = false;
          this.appVersion.errorString = '';
        }
      },
      error => {
          this.appVersion.showError = false;
          this.appVersion.errorString = '';
      }
    );
  }

  // pop-ups
  async forgotPasswordPopover(event: Event) {
    console.log(event);
    const popover = await this.popoverCtrl.create({
      component: ForgotPasswordPage,
      event,
      componentProps: {
        company: this.loginModel.accountName,
        login: this.loginModel.userName
      }
    });
    await popover.present();
  }

  // background intervals
  startBackGroundIntervals() {
    this.intervalCheckForAppUpdateId = interval(5000);
    this.intervalCheckForAppUpdate = this.intervalCheckForAppUpdateId.subscribe(val => this.getMobileAppVersion());
  }

}
