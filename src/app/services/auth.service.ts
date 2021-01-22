import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../shared/models/auth/login.model';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/auth/user.model';
import { environment } from '../../environments/environment';
import { EnvironmentSelectionModel } from '../shared/models/auth/environment.model';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private observable: Observable<any>;

  constructor(private http: HttpClient,
              public alertService: AlertService,
              public router: Router,
              private modalCtrl: ModalController) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginModel: LoginModel) {
    const url = localStorage.getItem('api_url');
    return this.http.post<User>(`${url}token`, loginModel)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
  }

  logout(apiCall = true) {
    const authData = this.currentUserValue;
    console.log('Logout data: ' + authData);
    const url = localStorage.getItem('api_url');
    this.modalCtrl.dismiss({dismissed: true})
    if(!url || !authData) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      window.dispatchEvent(new CustomEvent('user:logout'));
      return this.router.navigate(['/login']);
    }
    if(!apiCall) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      window.dispatchEvent(new CustomEvent('user:logout'));
      return;
    }
    return this.http.post(`${url}signOut`, {
      cognitoID: authData.cognitoID,
      accountID: authData.accountID,
      userID: authData.userID,
      cognitoUsername: authData.userName
    }).subscribe(_res => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      return this.router.navigate(['/login']);
    }, _error => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      return this.router.navigate(['/login']);
    });
  }

  environmentSelection(environmentSelectionModel: EnvironmentSelectionModel) {
    console.log(environmentSelectionModel);
    return this.http.get(environment.envSelectionUrl + environmentSelectionModel.code.toUpperCase(), {responseType: 'text'});
  }

  checkToken() {
    console.log('Test token');
    let cognitoId =  0;
    if(this.currentUserValue) {
      cognitoId = this.currentUserValue.cognitoID;
    }
    const url = localStorage.getItem('api_url');

    return this.http.get(`${url}api/home/getTokenStatus`, {
      params: {
        cognitoId: cognitoId.toString()
      }
    });
  }
}
