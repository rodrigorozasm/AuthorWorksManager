import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Work } from 'app/shared/model/work.model';
import { WorkService } from './work.service';
import { WorkComponent } from './work.component';
import { WorkDetailComponent } from './work-detail.component';
import { WorkUpdateComponent } from './work-update.component';
import { WorkDeletePopupComponent } from './work-delete-dialog.component';
import { IWork } from 'app/shared/model/work.model';

@Injectable({ providedIn: 'root' })
export class WorkResolve implements Resolve<IWork> {
    constructor(private service: WorkService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Work> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Work>) => response.ok),
                map((work: HttpResponse<Work>) => work.body)
            );
        }
        return of(new Work());
    }
}

export const workRoute: Routes = [
    {
        path: 'work',
        component: WorkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'authorWorksManagerApp.work.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'work/:id/view',
        component: WorkDetailComponent,
        resolve: {
            work: WorkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'authorWorksManagerApp.work.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'work/new',
        component: WorkUpdateComponent,
        resolve: {
            work: WorkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'authorWorksManagerApp.work.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'work/:id/edit',
        component: WorkUpdateComponent,
        resolve: {
            work: WorkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'authorWorksManagerApp.work.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workPopupRoute: Routes = [
    {
        path: 'work/:id/delete',
        component: WorkDeletePopupComponent,
        resolve: {
            work: WorkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'authorWorksManagerApp.work.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
