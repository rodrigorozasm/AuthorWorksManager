import { IWork } from 'app/shared/model//work.model';
import { IAuthor } from 'app/shared/model//author.model';

export interface IAuthorWork {
    id?: number;
    work?: IWork;
    author?: IAuthor;
}

export class AuthorWork implements IAuthorWork {
    constructor(public id?: number, public work?: IWork, public author?: IAuthor) {}
}
