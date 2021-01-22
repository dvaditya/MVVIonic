import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient) { }

  getAppVersion() {
    return this.http.get(localStorage.getItem('api_url') + 'api/home/getMobileAppVersion');
  }
}
