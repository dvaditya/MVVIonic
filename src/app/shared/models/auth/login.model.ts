export class LoginModel {
    constructor(
        public accountName: string = '',
        public userName: string = '',
        public password: string = '',
        public request: string = '',
        public mfa: string = '',
        public emailToLink: string = '',
        public newPassword: string = '',
        public confirmPassword: string = '',
        public confirmMerge: boolean = false,
        public saveLogin: boolean = false
    ) {}
}
