/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AuthorWorksManagerTestModule } from '../../../test.module';
import { AuthorWorkComponent } from 'app/entities/author-work/author-work.component';
import { AuthorWorkService } from 'app/entities/author-work/author-work.service';
import { AuthorWork } from 'app/shared/model/author-work.model';

describe('Component Tests', () => {
    describe('AuthorWork Management Component', () => {
        let comp: AuthorWorkComponent;
        let fixture: ComponentFixture<AuthorWorkComponent>;
        let service: AuthorWorkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AuthorWorksManagerTestModule],
                declarations: [AuthorWorkComponent],
                providers: []
            })
                .overrideTemplate(AuthorWorkComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AuthorWorkComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorWorkService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AuthorWork(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.authorWorks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
