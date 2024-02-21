/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Article } from '../../models/article';
import { NewArticle } from '../../models/new-article';

export interface CreateArticle$Params {
  
    /**
     * Article to create
     */
    body: {
'article': NewArticle;
}
}

export function createArticle(http: HttpClient, rootUrl: string, params: CreateArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'article': Article;
}>> {
  const rb = new RequestBuilder(rootUrl, createArticle.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'article': Article;
      }>;
    })
  );
}

createArticle.PATH = '/articles';
