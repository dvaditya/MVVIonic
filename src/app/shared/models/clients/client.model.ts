export class ClientModel {
    constructor(
        public accountId: number = 0,
        public address: string = '',
        public address2: string = '',
        public admissionId: number = 0,
        public chartId: string = '',
        public city: string = '',
        public clientId: number = 0,
        public clientNo: number = 0,
        public companyCode: string = '',
        public displayName: string = '',
        public firstName: string = '',
        public gender: string = '',
        public houseHoldClientId: string = '',
        public inDst: boolean = false,
        public isHouseHoldClient: boolean = false,
        public lastName: string = '',
        public locationCode: string = '',
        public phone: string = '',
        public staffId: number = 0,
        public state: string = '',
        public timeZone: number = 0,
        public unscheduleVisitDate: string = '',
        public userId: number = 0,
        public zip: string = '',
        public directionsURL: string = ''
    ) {}
}
