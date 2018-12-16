import { IAuthor } from 'app/shared/model//author.model';

export interface ICountry {
    id?: number;
    countryName?: string;
    authors?: IAuthor[];
}

export class Country implements ICountry {
    constructor(public id?: number, public countryName?: string, public authors?: IAuthor[]) {}
}
