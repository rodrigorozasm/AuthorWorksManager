import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWork } from 'app/shared/model/work.model';

type EntityResponseType = HttpResponse<IWork>;
type EntityArrayResponseType = HttpResponse<IWork[]>;

@Injectable({ providedIn: 'root' })
export class WorkService {
    public resourceUrl = SERVER_API_URL + 'api/works';

    constructor(protected http: HttpClient) {}

    create(work: IWork): Observable<EntityResponseType> {
        return this.http.post<IWork>(this.resourceUrl, work, { observe: 'response' });
    }

    update(work: IWork): Observable<EntityResponseType> {
        return this.http.put<IWork>(this.resourceUrl, work, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IWork>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IWork[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
