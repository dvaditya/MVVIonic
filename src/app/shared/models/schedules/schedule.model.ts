import { ScheduleTaskModel } from './schedule-task.model';
import { NonCarePlanTasksModel } from './non-careplan-task.model';

export class ScheduleModel {
    constructor(
        public accountId: number = 0,
        public scheduleId: number = 0,
        public admissionId: number = 0,
        public clientId: number = 0,
        public clientNo: number = 0,
        public staffId: number = 0,
        public staffNo: number = 0,
        public serviceCode: string = '',
        public serviceName: string = '',
        public activityCode: string = '',
        public activityCodeM: string = '',
        public activityName: string = '',
        public displayName: string = '',
        public firstName: string = '',
        public lastName: string = '',
        public date: Date = null,
        public timeIns: Date = null,
        public timeOuts: Date = null,
        public timeIn: Date = null,
        public timeOut: Date = null,
        public isUnscheduled: boolean = false,
        public status: string = '',
        public durationS: number = 0,
        public phone: string = '',
        public directionsURL: string = '',
        public address: string = '',
        public address2: string = '',
        public city: string = '',
        public state: string = '',
        public zip: string = '',
        public miles: number = 0,
        public comments: string = '',
        // public carePlanTasks: CarePlanTasksModel[] = [],
        public nonCarePlanTasks: NonCarePlanTasksModel[] = [],
        public scheduleTasks: ScheduleTaskModel[] = []
    ) {}
}
