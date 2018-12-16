import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWork } from 'app/shared/model/work.model';

@Component({
    selector: 'jhi-work-detail',
    templateUrl: './work-detail.component.html'
})
export class WorkDetailComponent implements OnInit {
    work: IWork;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ work }) => {
            this.work = work;
        });
    }

    previousState() {
        window.history.back();
    }
}
