import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IWork } from 'app/shared/model/work.model';
import { WorkService } from './work.service';

@Component({
    selector: 'jhi-work-update',
    templateUrl: './work-update.component.html'
})
export class WorkUpdateComponent implements OnInit {
    work: IWork;
    isSaving: boolean;

    constructor(protected workService: WorkService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ work }) => {
            this.work = work;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.work.id !== undefined) {
            this.subscribeToSaveResponse(this.workService.update(this.work));
        } else {
            this.subscribeToSaveResponse(this.workService.create(this.work));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IWork>>) {
        result.subscribe((res: HttpResponse<IWork>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
