/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AuthorWorksManagerTestModule } from '../../../test.module';
import { WorkComponent } from 'app/entities/work/work.component';
import { WorkService } from 'app/entities/work/work.service';
import { Work } from 'app/shared/model/work.model';

describe('Component Tests', () => {
    describe('Work Management Component', () => {
        let comp: WorkComponent;
        let fixture: ComponentFixture<WorkComponent>;
        let service: WorkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AuthorWorksManagerTestModule],
                declarations: [WorkComponent],
                providers: []
            })
                .overrideTemplate(WorkComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WorkComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Work(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.works[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
