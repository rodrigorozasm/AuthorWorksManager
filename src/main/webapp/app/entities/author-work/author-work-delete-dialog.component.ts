import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAuthorWork } from 'app/shared/model/author-work.model';
import { AuthorWorkService } from './author-work.service';

@Component({
    selector: 'jhi-author-work-delete-dialog',
    templateUrl: './author-work-delete-dialog.component.html'
})
export class AuthorWorkDeleteDialogComponent {
    authorWork: IAuthorWork;

    constructor(
        protected authorWorkService: AuthorWorkService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.authorWorkService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'authorWorkListModification',
                content: 'Deleted an authorWork'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-author-work-delete-popup',
    template: ''
})
export class AuthorWorkDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ authorWork }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AuthorWorkDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.authorWork = authorWork;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
