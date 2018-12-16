import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from './author.service';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country';

@Component({
    selector: 'jhi-author-update',
    templateUrl: './author-update.component.html'
})
export class AuthorUpdateComponent implements OnInit {
    author: IAuthor;
    isSaving: boolean;

    countries: ICountry[];
    birthDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected authorService: AuthorService,
        protected countryService: CountryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ author }) => {
            this.author = author;
        });
        this.countryService.query().subscribe(
            (res: HttpResponse<ICountry[]>) => {
                this.countries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.author.id !== undefined) {
            this.subscribeToSaveResponse(this.authorService.update(this.author));
        } else {
            this.subscribeToSaveResponse(this.authorService.create(this.author));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAuthor>>) {
        result.subscribe((res: HttpResponse<IAuthor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCountryById(index: number, item: ICountry) {
        return item.id;
    }
}
