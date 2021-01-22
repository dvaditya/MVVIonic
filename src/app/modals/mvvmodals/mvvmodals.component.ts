import { Component, OnInit } from '@angular/core';
import { ScheduleTaskModel } from 'src/app/shared/models/schedules/schedule-task.model';
import { ModalTypeEnum } from 'src/app/shared/enums/modal-type.enum';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mvvmodals',
  templateUrl: './mvvmodals.component.html',
})
export class MvvmodalsComponent implements OnInit {
  public modalType: number;
  public showCompeltedTasks = false;
  public completedTasks: ScheduleTaskModel[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.modalType === ModalTypeEnum.completedTasks) {
      this.showCompeltedTasks = true;
    }
  }

  onDismiss() {
    this.modalCtrl.dismiss({dismissed: true});
  }

}
