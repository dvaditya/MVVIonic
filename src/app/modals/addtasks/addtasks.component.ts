import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScheduleTaskModel } from 'src/app/shared/models/schedules/schedule-task.model';
import { CarePlanTasksModel } from 'src/app/shared/models/schedules/careplan-task.model';
import { NonCarePlanTasksModel } from 'src/app/shared/models/schedules/non-careplan-task.model';

@Component({
  selector: 'app-addtasks',
  templateUrl: './addtasks.component.html',
  styleUrls: [],
})
export class AddtasksComponent implements OnInit {
  public carePlanTasks: CarePlanTasksModel[];
  public nonCarePlanTasks: NonCarePlanTasksModel[];
  public showAdditionTasks: boolean;
  public showCarePlanTasks: boolean;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.showAdditionTasks = false;
    this.showCarePlanTasks = true;
  }

  onDismiss() {
    this.modalCtrl.dismiss({dismissed: true});
  }

}
