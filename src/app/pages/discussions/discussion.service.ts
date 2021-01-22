import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiscussionModel } from 'src/app/shared/models/discussions/discussion.model';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  constructor(private http: HttpClient) { }

  getDiscussions(offlineData) {
    if(true) {
      const url = localStorage.getItem('api_url');
      return this.http.get<DiscussionModel[]>(`${url}api/discussions/getDiscussions`, {
          params: {
          accountId: '0',
          userId: '0',
          offlineData
      }});
    } else {
      console.log('Network not available');
    }
  }
}
