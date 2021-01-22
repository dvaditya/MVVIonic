import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ScheduleModel } from 'src/app/shared/models/schedules/schedule.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/models/auth/user.model';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {
  public schedulesList: ScheduleModel[] = [];
  public segment: string;
  public currentSchedules: ScheduleModel[] = [];
  public pastSchedules: ScheduleModel[] = [];
  public getAllSchedules: ScheduleModel[] = [];
  public todayDateFormat: string;
  public isPageLoading: boolean;

  constructor(public authService: AuthService,
              public scheduleService: ScheduleService,
              public datePipe: DatePipe) {
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.isPageLoading = true;
    this.todayDateFormat = this.datePipe.transform(new Date(), 'EEEE, MMMM d');
    this.getSchedules();
  }

  getSchedules() {
    this.scheduleService.getScheduleList()
    .subscribe(
      data => {
        this.getAllSchedules = data;
        const currentDateTime = new Date();
        const midnightDate = new Date((new Date()).setHours(0, 0, 0, 0));
        let timeOutDiffHours = 0;
        this.getAllSchedules.forEach(sch => {
          if (sch.timeOut !== null) {
            const timeOutDiffMillSeconds = currentDateTime.getTime() - new Date(sch.timeOut).getTime();
            timeOutDiffHours = timeOutDiffMillSeconds / (1000 * 60 * 60);
          }

          if (sch.date !== null && new Date(sch.date) >= midnightDate) {
            if (sch.timeIn !== null && sch.timeOut !== null && timeOutDiffHours > 6) {
              this.pastSchedules.push(sch);
            } else {
              this.currentSchedules.push(sch);
            }
          } else {
            this.pastSchedules.push(sch);
          }
        });
        this.updateSchedule();
        this.isPageLoading = false;
      },
      error => {}
    );
  }

  getStatusName(sch: ScheduleModel) {
    let statusName = '';
    if (sch.timeIn === null && sch.timeOut === null) {
       statusName = 'Pending';
    } else if (sch.timeIn !== null && sch.timeOut === null) {
       statusName = 'In Progress';
    } else if (sch.timeIn !== null && sch.timeOut !== null) {
       statusName = 'Completed';
    }
    return statusName;
  }

  scheduleRowCss(sch: ScheduleModel) {
    if(sch.timeIn && sch.timeOut) {
      return 'color-green';
    }
    return '';
  }

  updateSchedule() {
    switch (this.segment) {
      case 'current':
        this.schedulesList = this.currentSchedules;
        break;

      case 'past':
        this.schedulesList = this.pastSchedules;
        break;

      default:
        this.segment = 'current';
        this.schedulesList = this.currentSchedules;
        break;
    }
  }

}
