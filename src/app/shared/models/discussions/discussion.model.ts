import { DiscussionMessageModel } from './discussion-message.model';
import { DiscussionUsersModel } from './discussion-users.model';
import { SystemUsersModel } from './system-users.model';

export class DiscussionModel {
    constructor(
        public accountId: number,
        public discussionId: number,
        public parent: number,
        public parentId: number,
        public discussionType: number,
        public chart: boolean,
        public purge: boolean,
        public expires: boolean,
        public expiresOn: Date,
        public status: number,
        public creator: number,
        public created: Date,
        public unreadMessageCount: number,
        public discussionMessagesEntityModelLatest: DiscussionMessageModel,
        public discussionMessages: DiscussionMessageModel[] = [],
        public discussionUsers: DiscussionUsersModel[] = [],
        public systemUsers: SystemUsersModel[] = []
    ) {}
}
