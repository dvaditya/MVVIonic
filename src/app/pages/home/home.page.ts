import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ScheduleModel } from 'src/app/shared/models/schedules/schedule.model';
import { ScheduleService } from 'src/app/pages/schedules/schedule.service';
import { Helper } from 'src/app/shared/helpers/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public schedulesList: ScheduleModel[] = [];
  public isPageLoading: boolean;

  constructor(public authService: AuthService,
              public scheduleService: ScheduleService,
              public helper: Helper) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.isPageLoading = true;
    this.getHomeSchedules();
  }

  getHomeSchedules() {
    this.scheduleService.getHomeSchedules().subscribe(
      (sch: ScheduleModel[]) => {
        this.schedulesList = sch;
        this.schedulesList.forEach(schedule => {
          schedule.phone = this.helper.formatPhoneNumber(schedule.phone);
          schedule.directionsURL = this.helper.getAddressURL(schedule);
        });
        this.isPageLoading = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
