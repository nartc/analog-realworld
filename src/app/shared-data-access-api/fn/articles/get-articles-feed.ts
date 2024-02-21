/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Article } from '../../models/article';

export interface GetArticlesFeed$Params {

/**
 * The number of items to skip before starting to collect the result set.
 */
  offset?: number;

/**
 * The numbers of items to return.
 */
  limit?: number;
}

export function getArticlesFeed(http: HttpClient, rootUrl: string, params?: GetArticlesFeed$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'articles': Array<Article>;
'articlesCount': number;
}>> {
  const rb = new RequestBuilder(rootUrl, getArticlesFeed.PATH, 'get');
  if (params) {
    rb.query('offset', params.offset, {});
    rb.query('limit', params.limit, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'articles': Array<Article>;
      'articlesCount': number;
      }>;
    })
  );
}

getArticlesFeed.PATH = '/articles/feed';
