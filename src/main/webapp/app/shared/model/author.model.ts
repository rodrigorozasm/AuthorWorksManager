import { Moment } from 'moment';
import { ICountry } from 'app/shared/model//country.model';

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNDEF = 'UNDEF'
}

export interface IAuthor {
    id?: number;
    names?: string;
    lastNames?: string;
    formattedCompletName?: string;
    birthDate?: Moment;
    gender?: Gender;
    country?: ICountry;
}

export class Author implements IAuthor {
    constructor(
        public id?: number,
        public names?: string,
        public lastNames?: string,
        public formattedCompletName?: string,
        public birthDate?: Moment,
        public gender?: Gender,
        public country?: ICountry
    ) {}
}
