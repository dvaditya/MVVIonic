import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleModel } from 'src/app/shared/models/schedules/schedule.model';
import { ScheduleService } from '../schedule.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ScheduleTaskModel } from 'src/app/shared/models/schedules/schedule-task.model';
import { AddtasksComponent } from 'src/app/modals/addtasks/addtasks.component';
import { CarePlanTasksModel } from 'src/app/shared/models/schedules/careplan-task.model';
import { NonCarePlanTasksModel } from 'src/app/shared/models/schedules/non-careplan-task.model';
import { MvvmodalsComponent } from 'src/app/modals/mvvmodals/mvvmodals.component';
import { ModalTypeEnum } from 'src/app/shared/enums/modal-type.enum';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  public schedule: ScheduleModel = new ScheduleModel();
  public completedTasks: ScheduleTaskModel[] = [];
  public carePlanTasks: CarePlanTasksModel[] = [];
  public nonCarePlanTasks: NonCarePlanTasksModel[] = [];

  public isPageLoading: boolean;
  public scheduleId: string;

  public showOptionDropDown: boolean;

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isPageLoading = true;
    this.showOptionDropDown = false;
    this.scheduleId = this.route.snapshot.paramMap.get('id');
    this.getSchedule();
  }

  getSchedule() {
    this.scheduleService.getSchedule(this.scheduleId).subscribe(
      (res: ScheduleModel) => {
        this.schedule = res;
        this.loadCarePlanTasks(this.schedule.scheduleTasks);
        this.nonCarePlanTasks = this.schedule.nonCarePlanTasks;
        this.isPageLoading = false;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  loadCarePlanTasks(scheduleTasks: ScheduleTaskModel[]) {
    const carePlanTasks = scheduleTasks.filter(st => st.carePlan);
    this.completedTasks = scheduleTasks.filter(st=> (st.carePlan && st.completed) || (!st.carePlan));
    if(carePlanTasks.length > 0) {
      carePlanTasks.forEach(ct => {
        const careplan: CarePlanTasksModel = new CarePlanTasksModel();
        careplan.accountId = ct.accountId;
        careplan.scheduleId = ct.scheduleId;
        careplan.taskId = ct.taskId;
        careplan.code = ct.code;
        careplan.value = ct.value;
        careplan.completed = ct.completed;
        careplan.inComplete = ct.inComplete;
        careplan.carePlan = ct.carePlan;
        careplan.taskName = ct.taskName;
        careplan.refused = ct.refused;
        careplan.reason = ct.reason;
        careplan.valueItemCode = ct.valueItemCode;
        careplan.valueItemCategory = ct.valueItemCategory;
        careplan.quantity = ct.quantity;
        careplan.isMileage = ct.isMileage;
        careplan.valueItems = ct.valueItemsList;
        this.carePlanTasks.push(careplan);
      });
    }
  }

  async openAddTasksModal() {
    const addTasksModal = this.modalCtrl.create(
      {
        component: AddtasksComponent,
        cssClass: 'add-tasks-css',
        componentProps: {
          carePlanTasks: this.carePlanTasks,
          nonCarePlanTasks: this.nonCarePlanTasks
        }
      }
    );
    return (await addTasksModal).present();
  }

  async openCompletedTasksModal() {
    const completedTasks = this.modalCtrl.create({
      component: MvvmodalsComponent,
      cssClass: 'mvv-modals-css',
      componentProps: {
        modalType: ModalTypeEnum.completedTasks,
        completedTasks: this.completedTasks
      }
    });
    return (await completedTasks).present();
  }
}
