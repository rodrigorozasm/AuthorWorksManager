export const enum WorkType {
    BOOK = 'BOOK',
    THESIS = 'THESIS',
    ARTICLE = 'ARTICLE',
    OTHER = 'OTHER'
}

export interface IWork {
    id?: number;
    workName?: string;
    workAbstract?: string;
    workType?: WorkType;
}

export class Work implements IWork {
    constructor(public id?: number, public workName?: string, public workAbstract?: string, public workType?: WorkType) {}
}
