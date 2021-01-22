export class MVVAccountSettingsModel {
    constructor(
        public accountId: number = 0,
        public geofencingRadius: boolean = false,
        public hasMVVAccess: boolean = false,
        public offlineAccessAllowed: boolean = false,
        public tasksEnabled: boolean = false,
        public carePlanTasksEnabled: boolean = false,
        public allowSavedCredentials: boolean = false,
        public allowUnscheduledVisits: boolean = false,
        public allowMobileNotes: boolean = false,
        public clockInThresholdEnabled: boolean = false,
        public clockInThresholdValue: number = 0,
        public chatEnabled: boolean = false,
        public taskRefusalEnabled: boolean = false,
        public clientListByServiceEnabled: boolean = false,
        public taskNoReasonEnabled: boolean = false,
        public taskValidationsEnabled: boolean = false,
        public allowYesResponseText: boolean = false,
        public clientActiveOnHoldEnabled: boolean = false,
        public locationTimeOutEnable: boolean = false,
        public locationTimeOutValue: number = 0,
        public hideClientPhoneEnabled: boolean = false,
        public mvvAccountOptions: number = 0,
        public clockInEarly: number = 0,
        public clockInLate: number = 0,
        public clockOutEarly: number = 0,
        public clockOutLate: number = 0,
        public clientVerificationSettings: number = 0
    ) {

    }
}
