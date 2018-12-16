import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAuthorWork } from 'app/shared/model/author-work.model';

type EntityResponseType = HttpResponse<IAuthorWork>;
type EntityArrayResponseType = HttpResponse<IAuthorWork[]>;

@Injectable({ providedIn: 'root' })
export class AuthorWorkService {
    public resourceUrl = SERVER_API_URL + 'api/author-works';

    constructor(protected http: HttpClient) {}

    create(authorWork: IAuthorWork): Observable<EntityResponseType> {
        return this.http.post<IAuthorWork>(this.resourceUrl, authorWork, { observe: 'response' });
    }

    update(authorWork: IAuthorWork): Observable<EntityResponseType> {
        return this.http.put<IAuthorWork>(this.resourceUrl, authorWork, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAuthorWork>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAuthorWork[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
