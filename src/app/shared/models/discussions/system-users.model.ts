export class SystemUsersModel {
    constructor(
        public userId: number,
        public accountId: number,
        public userName: string,
        public active: boolean,
        public online: boolean,
        public lastLogin: Date
    ) {}
}
