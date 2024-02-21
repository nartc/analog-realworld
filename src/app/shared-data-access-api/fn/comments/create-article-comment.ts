/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Comment } from '../../models/comment';
import { NewComment } from '../../models/new-comment';

export interface CreateArticleComment$Params {

/**
 * Slug of the article that you want to create a comment for
 */
  slug: string;
  
    /**
     * Comment you want to create
     */
    body: {
'comment': NewComment;
}
}

export function createArticleComment(http: HttpClient, rootUrl: string, params: CreateArticleComment$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'comment': Comment;
}>> {
  const rb = new RequestBuilder(rootUrl, createArticleComment.PATH, 'post');
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
      'comment': Comment;
      }>;
    })
  );
}

createArticleComment.PATH = '/articles/{slug}/comments';
