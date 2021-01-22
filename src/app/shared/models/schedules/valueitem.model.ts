export class ValueItemModel {
    constructor(
        public accountID: number = 0,
        public category: string = null,
        public code: string = null,
        public name: string = null,
        public description: string = null,
        public color: string = null,
        public active: boolean = false,
        public valueItemID: number = 0,
        public configurationTemplateItemID: number = null
    ) {}
}
