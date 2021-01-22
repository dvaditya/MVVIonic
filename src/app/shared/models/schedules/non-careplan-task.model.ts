export class NonCarePlanTasksModel {
    constructor(
        public accountId: number = 0,
        public taskCode: string = null,
        public taskGroup: string = null,
        public taskName: string = null,
        public active: boolean = false,
        public isBillable: boolean = false,
        public isPayable: boolean = false,
        public payCode: string = null,
        public deptCode: string = null,
        public gLCode: string = null,
        public isExpense: boolean = false,
        public isMileage: boolean = false,
        public selected: boolean = false,
    ) {}
}
