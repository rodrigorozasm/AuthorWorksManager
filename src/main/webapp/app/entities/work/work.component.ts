import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWork } from 'app/shared/model/work.model';
import { AccountService } from 'app/core';
import { WorkService } from './work.service';

@Component({
    selector: 'jhi-work',
    templateUrl: './work.component.html'
})
export class WorkComponent implements OnInit, OnDestroy {
    works: IWork[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected workService: WorkService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.workService.query().subscribe(
            (res: HttpResponse<IWork[]>) => {
                this.works = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWorks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWork) {
        return item.id;
    }

    registerChangeInWorks() {
        this.eventSubscriber = this.eventManager.subscribe('workListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
