import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuthorWorksManagerAuthorModule } from './author/author.module';
import { AuthorWorksManagerCountryModule } from './country/country.module';
import { AuthorWorksManagerWorkModule } from './work/work.module';
import { AuthorWorksManagerAuthorWorkModule } from './author-work/author-work.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        AuthorWorksManagerAuthorModule,
        AuthorWorksManagerCountryModule,
        AuthorWorksManagerWorkModule,
        AuthorWorksManagerAuthorWorkModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthorWorksManagerEntityModule {}
