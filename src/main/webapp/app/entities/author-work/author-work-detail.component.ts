import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAuthorWork } from 'app/shared/model/author-work.model';

@Component({
    selector: 'jhi-author-work-detail',
    templateUrl: './author-work-detail.component.html'
})
export class AuthorWorkDetailComponent implements OnInit {
    authorWork: IAuthorWork;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ authorWork }) => {
            this.authorWork = authorWork;
        });
    }

    previousState() {
        window.history.back();
    }
}
