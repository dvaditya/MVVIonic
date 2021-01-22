import { environment } from 'src/environments/environment';

export class AppVersionModel {
    constructor(
        public version: string = environment.version,
        public errorString: string = '',
        public showError: boolean = false
    ) {}
}
