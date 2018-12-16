import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAuthorWork } from 'app/shared/model/author-work.model';
import { AuthorWorkService } from './author-work.service';
import { IWork } from 'app/shared/model/work.model';
import { WorkService } from 'app/entities/work';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author';

@Component({
    selector: 'jhi-author-work-update',
    templateUrl: './author-work-update.component.html'
})
export class AuthorWorkUpdateComponent implements OnInit {
    authorWork: IAuthorWork;
    isSaving: boolean;

    works: IWork[];

    authors: IAuthor[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected authorWorkService: AuthorWorkService,
        protected workService: WorkService,
        protected authorService: AuthorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ authorWork }) => {
            this.authorWork = authorWork;
        });
        this.workService.query().subscribe(
            (res: HttpResponse<IWork[]>) => {
                this.works = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.authorService.query().subscribe(
            (res: HttpResponse<IAuthor[]>) => {
                this.authors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.authorWork.id !== undefined) {
            this.subscribeToSaveResponse(this.authorWorkService.update(this.authorWork));
        } else {
            this.subscribeToSaveResponse(this.authorWorkService.create(this.authorWork));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAuthorWork>>) {
        result.subscribe((res: HttpResponse<IAuthorWork>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackWorkById(index: number, item: IWork) {
        return item.id;
    }

    trackAuthorById(index: number, item: IAuthor) {
        return item.id;
    }
}
