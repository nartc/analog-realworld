/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteArticleComment$Params {

/**
 * Slug of the article that you want to delete a comment for
 */
  slug: string;

/**
 * ID of the comment you want to delete
 */
  id: number;
}

export function deleteArticleComment(http: HttpClient, rootUrl: string, params: DeleteArticleComment$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, deleteArticleComment.PATH, 'delete');
  if (params) {
    rb.path('slug', params.slug, {});
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

deleteArticleComment.PATH = '/articles/{slug}/comments/{id}';
