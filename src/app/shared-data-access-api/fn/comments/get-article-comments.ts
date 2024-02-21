/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Comment } from '../../models/comment';

export interface GetArticleComments$Params {

/**
 * Slug of the article that you want to get comments for
 */
  slug: string;
}

export function getArticleComments(http: HttpClient, rootUrl: string, params: GetArticleComments$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'comments': Array<Comment>;
}>> {
  const rb = new RequestBuilder(rootUrl, getArticleComments.PATH, 'get');
  if (params) {
    rb.path('slug', params.slug, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'comments': Array<Comment>;
      }>;
    })
  );
}

getArticleComments.PATH = '/articles/{slug}/comments';
