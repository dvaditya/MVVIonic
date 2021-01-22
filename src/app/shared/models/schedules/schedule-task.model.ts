import { ValueItemModel } from './valueitem.model';

export class ScheduleTaskModel {
    constructor(
        public accountId: number = 0,
        public scheduleId: number = 0,
        public taskId: number = 0,
        public code: string = '',
        public value: string = '',
        public completed: boolean = null,
        public inComplete: boolean = false,
        public carePlan: boolean = false,
        public taskName: string = '',
        public refused: boolean = false,
        public reason: string = '',
        public valueItemCode: string = '',
        public valueItemCategory: string,
        public quantity: number = null,
        public isMileage: boolean = false,
        public valueItemsList: ValueItemModel[] = []
    ) {}
}
