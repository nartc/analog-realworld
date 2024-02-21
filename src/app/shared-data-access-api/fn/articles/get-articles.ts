/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Article } from '../../models/article';

export interface GetArticles$Params {

/**
 * Filter by tag
 */
  tag?: string;

/**
 * Filter by author (username)
 */
  author?: string;

/**
 * Filter by favorites of a user (username)
 */
  favorited?: string;

/**
 * The number of items to skip before starting to collect the result set.
 */
  offset?: number;

/**
 * The numbers of items to return.
 */
  limit?: number;
}

export function getArticles(http: HttpClient, rootUrl: string, params?: GetArticles$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'articles': Array<Article>;
'articlesCount': number;
}>> {
  const rb = new RequestBuilder(rootUrl, getArticles.PATH, 'get');
  if (params) {
    rb.query('tag', params.tag, {});
    rb.query('author', params.author, {});
    rb.query('favorited', params.favorited, {});
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

getArticles.PATH = '/articles';
