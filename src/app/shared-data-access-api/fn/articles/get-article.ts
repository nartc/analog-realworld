/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Article } from '../../models/article';

export interface GetArticle$Params {

/**
 * Slug of the article to get
 */
  slug: string;
}

export function getArticle(http: HttpClient, rootUrl: string, params: GetArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'article': Article;
}>> {
  const rb = new RequestBuilder(rootUrl, getArticle.PATH, 'get');
  if (params) {
    rb.path('slug', params.slug, {});
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

getArticle.PATH = '/articles/{slug}';
