import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ScheduleModel } from 'src/app/shared/models/schedules/schedule.model';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public scheduleList: ScheduleModel[];
  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getScheduleList() {
    if(true) {
        const url = localStorage.getItem('api_url');
        return this.http.get<ScheduleModel[]>(`${url}api/schedules/getAllSchedules`, {
            params: {
            accountId: '0',
            staffId: '0'
        }});
    } else {
        console.log('Network not available');
    }
  }

  getHomeSchedules() {
    if(true) {
        const url = localStorage.getItem('api_url');
        return this.http.get<ScheduleModel[]>(`${url}api/home/getHomeSchedules`, {
            params: {
            accountId: '0',
            staffId: '0'
        }});
    } else {
        console.log('Network not available');
    }
  }

  getSchedule(scheduleId) {
    if(true) {
      const url = localStorage.getItem('api_url');
      const user = this.authService.currentUserValue;
      return this.http.get<ScheduleModel>(`${url}api/schedules/getScheduleById`, {
          params: {
            scheduleId,
            staffNo: user.staffNo.toString()
      }});
    } else {
      console.log('Network not available');
    }
  }
}
