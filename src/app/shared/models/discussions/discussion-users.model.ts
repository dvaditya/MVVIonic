export class DiscussionUsersModel {
    constructor(
        public accountId: number,
        public discussionId: number,
        public userName: string,
        public userId: number,
        public lastReadTime: Date,
        public lastNotificationTime: Date,
        public active: boolean,
        public lastSeenTime: Date,
        public currentUser: boolean,
    ) {}
}
