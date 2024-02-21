/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Article } from '../../models/article';
import { UpdateArticle } from '../../models/update-article';

export interface UpdateArticle$Params {

/**
 * Slug of the article to update
 */
  slug: string;
  
    /**
     * Article to update
     */
    body: {
'article': UpdateArticle;
}
}

export function updateArticle(http: HttpClient, rootUrl: string, params: UpdateArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'article': Article;
}>> {
  const rb = new RequestBuilder(rootUrl, updateArticle.PATH, 'put');
  if (params) {
    rb.path('slug', params.slug, {});
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

updateArticle.PATH = '/articles/{slug}';
