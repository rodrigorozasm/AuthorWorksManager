/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AuthorWorksManagerTestModule } from '../../../test.module';
import { WorkUpdateComponent } from 'app/entities/work/work-update.component';
import { WorkService } from 'app/entities/work/work.service';
import { Work } from 'app/shared/model/work.model';

describe('Component Tests', () => {
    describe('Work Management Update Component', () => {
        let comp: WorkUpdateComponent;
        let fixture: ComponentFixture<WorkUpdateComponent>;
        let service: WorkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AuthorWorksManagerTestModule],
                declarations: [WorkUpdateComponent]
            })
                .overrideTemplate(WorkUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WorkUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Work(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.work = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Work();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.work = entity;
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
