import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, interval, Subscription } from 'rxjs';
import { TokenStatus } from './shared/enums/token-status.enum';
import { User } from './shared/models/auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public tokenExpiryCheck: Subscription;
  public tokenExpiryCheckSource: Observable<number> = interval(30000);
  public currentUser: User;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.listenForLoginEvents();
  }

  // click events
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    return window.dispatchEvent(new CustomEvent('user:logout'));
  }

  // Login Events
  checkForTokenExpiry() {
    console.log(100);
    this.authService.checkToken().subscribe((data: number) => {
      if(data === TokenStatus.invalid) {
        this.authService.logout();
      }
    }, error => {
      console.log(error);
      this.authService.logout();
    });
  }

  listenForLoginEvents() {
    if(this.currentUser && (!this.tokenExpiryCheck || this.tokenExpiryCheck.closed)) {
      this.tokenExpiryCheck = this.tokenExpiryCheckSource.subscribe(val => this.checkForTokenExpiry());
    } else if(!this.currentUser && this.tokenExpiryCheck) {
      this.tokenExpiryCheck.unsubscribe();
    }

    window.addEventListener('user:login', () => {
       this.tokenExpiryCheck = this.tokenExpiryCheckSource.subscribe(val => this.checkForTokenExpiry());
       console.log('Token check started');
    });

    window.addEventListener('user:logout', () => {
      this.tokenExpiryCheck.unsubscribe();
      console.log('Token check stopped');
    });
  }
}
