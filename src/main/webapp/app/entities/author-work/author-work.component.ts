import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAuthorWork } from 'app/shared/model/author-work.model';
import { AccountService } from 'app/core';
import { AuthorWorkService } from './author-work.service';

@Component({
    selector: 'jhi-author-work',
    templateUrl: './author-work.component.html'
})
export class AuthorWorkComponent implements OnInit, OnDestroy {
    authorWorks: IAuthorWork[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected authorWorkService: AuthorWorkService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.authorWorkService.query().subscribe(
            (res: HttpResponse<IAuthorWork[]>) => {
                this.authorWorks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAuthorWorks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAuthorWork) {
        return item.id;
    }

    registerChangeInAuthorWorks() {
        this.eventSubscriber = this.eventManager.subscribe('authorWorkListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
