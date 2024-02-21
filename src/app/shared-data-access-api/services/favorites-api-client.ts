/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseApiClient } from '../base-api-client';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Article } from '../models/article';
import { createArticleFavorite } from '../fn/favorites/create-article-favorite';
import { CreateArticleFavorite$Params } from '../fn/favorites/create-article-favorite';
import { deleteArticleFavorite } from '../fn/favorites/delete-article-favorite';
import { DeleteArticleFavorite$Params } from '../fn/favorites/delete-article-favorite';

@Injectable({ providedIn: 'root' })
export class FavoritesApiClient extends BaseApiClient {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createArticleFavorite()` */
  static readonly CreateArticleFavoritePath = '/articles/{slug}/favorite';

  /**
   * Favorite an article.
   *
   * Favorite an article. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createArticleFavorite()` instead.
   *
   * This method doesn't expect any request body.
   */
  createArticleFavorite$Response(params: CreateArticleFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'article': Article;
}>> {
    return createArticleFavorite(this.http, this.rootUrl, params, context);
  }

  /**
   * Favorite an article.
   *
   * Favorite an article. Auth is required
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createArticleFavorite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createArticleFavorite(params: CreateArticleFavorite$Params, context?: HttpContext): Observable<{
'article': Article;
}> {
    return this.createArticleFavorite$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'article': Article;
}>): {
'article': Article;
} => r.body)
    );
  }

  /** Path part for operation `deleteArticleFavorite()` */
  static readonly DeleteArticleFavoritePath = '/articles/{slug}/favorite';

  /**
   * Unfavorite an article.
   *
   * Unfavorite an article. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticleFavorite()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticleFavorite$Response(params: DeleteArticleFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'article': Article;
}>> {
    return deleteArticleFavorite(this.http, this.rootUrl, params, context);
  }

  /**
   * Unfavorite an article.
   *
   * Unfavorite an article. Auth is required
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteArticleFavorite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticleFavorite(params: DeleteArticleFavorite$Params, context?: HttpContext): Observable<{
'article': Article;
}> {
    return this.deleteArticleFavorite$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'article': Article;
}>): {
'article': Article;
} => r.body)
    );
  }

}
