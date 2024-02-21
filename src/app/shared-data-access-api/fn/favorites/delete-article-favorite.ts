/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Article } from '../../models/article';

export interface DeleteArticleFavorite$Params {

/**
 * Slug of the article that you want to unfavorite
 */
  slug: string;
}

export function deleteArticleFavorite(http: HttpClient, rootUrl: string, params: DeleteArticleFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'article': Article;
}>> {
  const rb = new RequestBuilder(rootUrl, deleteArticleFavorite.PATH, 'delete');
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

deleteArticleFavorite.PATH = '/articles/{slug}/favorite';
