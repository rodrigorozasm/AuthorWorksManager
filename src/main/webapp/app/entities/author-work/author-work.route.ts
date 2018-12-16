import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthorWork } from 'app/shared/model/author-work.model';
import { AuthorWorkService } from './author-work.service';
import { AuthorWorkComponent } from './author-work.component';
import { AuthorWorkDetailComponent } from './author-work-detail.component';
import { AuthorWorkUpdateComponent } from './author-work-update.component';
import { AuthorWorkDeletePopupComponent } from './author-work-delete-dialog.component';
import { IAuthorWork } from 'app/shared/model/author-work.model';

@Injectable({ providedIn: 'root' })
export class AuthorWorkResolve implements Resolve<IAuthorWork> {
    constructor(private service: AuthorWorkService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AuthorWork> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AuthorWork>) => response.ok),
                map((authorWork: HttpResponse<AuthorWork>) => authorWork.body)
            );
        }
        return of(new AuthorWork());
    }
}

export const authorWorkRoute: Routes = [
    {
        path: 'author-work',
        component: AuthorWorkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'authorWorksManagerApp.authorWork.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'author-work/:id/view',
        component: AuthorWorkDetailComponent,
        resolve: {
            authorWork: AuthorWorkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'authorWorksManagerApp.authorWork.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'author-work/new',
        component: AuthorWorkUpdateComponent,
        resolve: {
            authorWork: AuthorWorkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'authorWorksManagerApp.authorWork.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'author-work/:id/edit',
        component: AuthorWorkUpdateComponent,
        resolve: {
            authorWork: AuthorWorkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'authorWorksManagerApp.authorWork.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const authorWorkPopupRoute: Routes = [
    {
        path: 'author-work/:id/delete',
        component: AuthorWorkDeletePopupComponent,
        resolve: {
            authorWork: AuthorWorkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'authorWorksManagerApp.authorWork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
