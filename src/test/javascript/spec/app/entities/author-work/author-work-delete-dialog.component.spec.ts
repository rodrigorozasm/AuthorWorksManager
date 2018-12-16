/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AuthorWorksManagerTestModule } from '../../../test.module';
import { AuthorWorkDeleteDialogComponent } from 'app/entities/author-work/author-work-delete-dialog.component';
import { AuthorWorkService } from 'app/entities/author-work/author-work.service';

describe('Component Tests', () => {
    describe('AuthorWork Management Delete Component', () => {
        let comp: AuthorWorkDeleteDialogComponent;
        let fixture: ComponentFixture<AuthorWorkDeleteDialogComponent>;
        let service: AuthorWorkService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AuthorWorksManagerTestModule],
                declarations: [AuthorWorkDeleteDialogComponent]
            })
                .overrideTemplate(AuthorWorkDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AuthorWorkDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorWorkService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
