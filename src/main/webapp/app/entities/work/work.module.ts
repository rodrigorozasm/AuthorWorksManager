import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthorWorksManagerSharedModule } from 'app/shared';
import {
    WorkComponent,
    WorkDetailComponent,
    WorkUpdateComponent,
    WorkDeletePopupComponent,
    WorkDeleteDialogComponent,
    workRoute,
    workPopupRoute
} from './';

const ENTITY_STATES = [...workRoute, ...workPopupRoute];

@NgModule({
    imports: [AuthorWorksManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [WorkComponent, WorkDetailComponent, WorkUpdateComponent, WorkDeleteDialogComponent, WorkDeletePopupComponent],
    entryComponents: [WorkComponent, WorkUpdateComponent, WorkDeleteDialogComponent, WorkDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthorWorksManagerWorkModule {}
