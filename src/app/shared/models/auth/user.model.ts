export class User {
    constructor(public accountID: number,
                public cognitoID: number,
                public commonEndPointEmail: [],
                public displayName: string = '',
                public enableQuestionnaire: boolean,
                public error: string,
                public inDst: boolean,
                public result: number,
                public staffID: number,
                public staffNo: number,
                public timeZone: number,
                public token: string,
                public userID: number,
                public userName: string
        ) {}
}
