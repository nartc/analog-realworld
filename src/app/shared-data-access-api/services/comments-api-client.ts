/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseApiClient } from '../base-api-client';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Comment } from '../models/comment';
import { createArticleComment } from '../fn/comments/create-article-comment';
import { CreateArticleComment$Params } from '../fn/comments/create-article-comment';
import { deleteArticleComment } from '../fn/comments/delete-article-comment';
import { DeleteArticleComment$Params } from '../fn/comments/delete-article-comment';
import { getArticleComments } from '../fn/comments/get-article-comments';
import { GetArticleComments$Params } from '../fn/comments/get-article-comments';

@Injectable({ providedIn: 'root' })
export class CommentsApiClient extends BaseApiClient {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getArticleComments()` */
  static readonly GetArticleCommentsPath = '/articles/{slug}/comments';

  /**
   * Get comments for an article.
   *
   * Get the comments for an article. Auth is optional
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticleComments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleComments$Response(params: GetArticleComments$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'comments': Array<Comment>;
}>> {
    return getArticleComments(this.http, this.rootUrl, params, context);
  }

  /**
   * Get comments for an article.
   *
   * Get the comments for an article. Auth is optional
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getArticleComments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleComments(params: GetArticleComments$Params, context?: HttpContext): Observable<{
'comments': Array<Comment>;
}> {
    return this.getArticleComments$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'comments': Array<Comment>;
}>): {
'comments': Array<Comment>;
} => r.body)
    );
  }

  /** Path part for operation `createArticleComment()` */
  static readonly CreateArticleCommentPath = '/articles/{slug}/comments';

  /**
   * Create a comment for an article.
   *
   * Create a comment for an article. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createArticleComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createArticleComment$Response(params: CreateArticleComment$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'comment': Comment;
}>> {
    return createArticleComment(this.http, this.rootUrl, params, context);
  }

  /**
   * Create a comment for an article.
   *
   * Create a comment for an article. Auth is required
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createArticleComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createArticleComment(params: CreateArticleComment$Params, context?: HttpContext): Observable<{
'comment': Comment;
}> {
    return this.createArticleComment$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'comment': Comment;
}>): {
'comment': Comment;
} => r.body)
    );
  }

  /** Path part for operation `deleteArticleComment()` */
  static readonly DeleteArticleCommentPath = '/articles/{slug}/comments/{id}';

  /**
   * Delete a comment for an article.
   *
   * Delete a comment for an article. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticleComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticleComment$Response(params: DeleteArticleComment$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteArticleComment(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete a comment for an article.
   *
   * Delete a comment for an article. Auth is required
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteArticleComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticleComment(params: DeleteArticleComment$Params, context?: HttpContext): Observable<void> {
    return this.deleteArticleComment$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
