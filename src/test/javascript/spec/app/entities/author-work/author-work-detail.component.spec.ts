/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AuthorWorksManagerTestModule } from '../../../test.module';
import { AuthorWorkDetailComponent } from 'app/entities/author-work/author-work-detail.component';
import { AuthorWork } from 'app/shared/model/author-work.model';

describe('Component Tests', () => {
    describe('AuthorWork Management Detail Component', () => {
        let comp: AuthorWorkDetailComponent;
        let fixture: ComponentFixture<AuthorWorkDetailComponent>;
        const route = ({ data: of({ authorWork: new AuthorWork(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AuthorWorksManagerTestModule],
                declarations: [AuthorWorkDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AuthorWorkDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AuthorWorkDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.authorWork).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
