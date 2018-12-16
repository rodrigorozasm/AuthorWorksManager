/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AuthorWorksManagerTestModule } from '../../../test.module';
import { AuthorWorkUpdateComponent } from 'app/entities/author-work/author-work-update.component';
import { AuthorWorkService } from 'app/entities/author-work/author-work.service';
import { AuthorWork } from 'app/shared/model/author-work.model';

describe('Component Tests', () => {
    describe('AuthorWork Management Update Component', () => {
        let comp: AuthorWorkUpdateComponent;
        let fixture: ComponentFixture<AuthorWorkUpdateComponent>;
        let service: AuthorWorkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AuthorWorksManagerTestModule],
                declarations: [AuthorWorkUpdateComponent]
            })
                .overrideTemplate(AuthorWorkUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AuthorWorkUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorWorkService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AuthorWork(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.authorWork = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AuthorWork();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.authorWork = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
