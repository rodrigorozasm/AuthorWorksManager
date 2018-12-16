import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthorWorksManagerSharedModule } from 'app/shared';
import {
    CountryComponent,
    CountryDetailComponent,
    CountryUpdateComponent,
    CountryDeletePopupComponent,
    CountryDeleteDialogComponent,
    countryRoute,
    countryPopupRoute
} from './';

const ENTITY_STATES = [...countryRoute, ...countryPopupRoute];

@NgModule({
    imports: [AuthorWorksManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CountryComponent,
        CountryDetailComponent,
        CountryUpdateComponent,
        CountryDeleteDialogComponent,
        CountryDeletePopupComponent
    ],
    entryComponents: [CountryComponent, CountryUpdateComponent, CountryDeleteDialogComponent, CountryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthorWorksManagerCountryModule {}
