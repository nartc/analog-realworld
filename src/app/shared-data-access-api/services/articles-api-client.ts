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
import { createArticle } from '../fn/articles/create-article';
import { CreateArticle$Params } from '../fn/articles/create-article';
import { deleteArticle } from '../fn/articles/delete-article';
import { DeleteArticle$Params } from '../fn/articles/delete-article';
import { getArticle } from '../fn/articles/get-article';
import { GetArticle$Params } from '../fn/articles/get-article';
import { getArticles } from '../fn/articles/get-articles';
import { GetArticles$Params } from '../fn/articles/get-articles';
import { getArticlesFeed } from '../fn/articles/get-articles-feed';
import { GetArticlesFeed$Params } from '../fn/articles/get-articles-feed';
import { updateArticle } from '../fn/articles/update-article';
import { UpdateArticle$Params } from '../fn/articles/update-article';

@Injectable({ providedIn: 'root' })
export class ArticlesApiClient extends BaseApiClient {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getArticlesFeed()` */
  static readonly GetArticlesFeedPath = '/articles/feed';

  /**
   * Get recent articles from users you follow.
   *
   * Get most recent articles from users you follow. Use query parameters to limit. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticlesFeed()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticlesFeed$Response(params?: GetArticlesFeed$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'articles': Array<Article>;
'articlesCount': number;
}>> {
    return getArticlesFeed(this.http, this.rootUrl, params, context);
  }

  /**
   * Get recent articles from users you follow.
   *
   * Get most recent articles from users you follow. Use query parameters to limit. Auth is required
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getArticlesFeed$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticlesFeed(params?: GetArticlesFeed$Params, context?: HttpContext): Observable<{
'articles': Array<Article>;
'articlesCount': number;
}> {
    return this.getArticlesFeed$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'articles': Array<Article>;
'articlesCount': number;
}>): {
'articles': Array<Article>;
'articlesCount': number;
} => r.body)
    );
  }

  /** Path part for operation `getArticles()` */
  static readonly GetArticlesPath = '/articles';

  /**
   * Get recent articles globally.
   *
   * Get most recent articles globally. Use query parameters to filter results. Auth is optional
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticles$Response(params?: GetArticles$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'articles': Array<Article>;
'articlesCount': number;
}>> {
    return getArticles(this.http, this.rootUrl, params, context);
  }

  /**
   * Get recent articles globally.
   *
   * Get most recent articles globally. Use query parameters to filter results. Auth is optional
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticles(params?: GetArticles$Params, context?: HttpContext): Observable<{
'articles': Array<Article>;
'articlesCount': number;
}> {
    return this.getArticles$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'articles': Array<Article>;
'articlesCount': number;
}>): {
'articles': Array<Article>;
'articlesCount': number;
} => r.body)
    );
  }

  /** Path part for operation `createArticle()` */
  static readonly CreateArticlePath = '/articles';

  /**
   * Create an article.
   *
   * Create an article. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createArticle$Response(params: CreateArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'article': Article;
}>> {
    return createArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * Create an article.
   *
   * Create an article. Auth is required
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createArticle(params: CreateArticle$Params, context?: HttpContext): Observable<{
'article': Article;
}> {
    return this.createArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'article': Article;
}>): {
'article': Article;
} => r.body)
    );
  }

  /** Path part for operation `getArticle()` */
  static readonly GetArticlePath = '/articles/{slug}';

  /**
   * Get an article.
   *
   * Get an article. Auth not required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticle$Response(params: GetArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'article': Article;
}>> {
    return getArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * Get an article.
   *
   * Get an article. Auth not required
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticle(params: GetArticle$Params, context?: HttpContext): Observable<{
'article': Article;
}> {
    return this.getArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'article': Article;
}>): {
'article': Article;
} => r.body)
    );
  }

  /** Path part for operation `updateArticle()` */
  static readonly UpdateArticlePath = '/articles/{slug}';

  /**
   * Update an article.
   *
   * Update an article. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticle$Response(params: UpdateArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'article': Article;
}>> {
    return updateArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * Update an article.
   *
   * Update an article. Auth is required
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticle(params: UpdateArticle$Params, context?: HttpContext): Observable<{
'article': Article;
}> {
    return this.updateArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'article': Article;
}>): {
'article': Article;
} => r.body)
    );
  }

  /** Path part for operation `deleteArticle()` */
  static readonly DeleteArticlePath = '/articles/{slug}';

  /**
   * Delete an article.
   *
   * Delete an article. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle$Response(params: DeleteArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete an article.
   *
   * Delete an article. Auth is required
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle(params: DeleteArticle$Params, context?: HttpContext): Observable<void> {
    return this.deleteArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
