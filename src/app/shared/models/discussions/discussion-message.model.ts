export class DiscussionMessageModel {
    constructor(
        public accountId: number,
        public userId: number,
        public userName: string,
        public currentUser: boolean,
        public discussionId: number,
        public messageId: number,
        public message: string,
        public stringToColor: string,
        public initials: string,
        public markMsgSent: boolean,
        public markMsgSeen: boolean,
        public markMsgReceived: boolean,
        public timestamp: Date,
    ) {}
}
