/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseApiClient } from '../base-api-client';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getTags } from '../fn/tags/get-tags';
import { GetTags$Params } from '../fn/tags/get-tags';

@Injectable({ providedIn: 'root' })
export class TagsApiClient extends BaseApiClient {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getTags()` */
  static readonly GetTagsPath = '/tags';

  /**
   * Get tags.
   *
   * Get tags. Auth not required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTags()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags$Response(params?: GetTags$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'tags': Array<string>;
}>> {
    return getTags(this.http, this.rootUrl, params, context);
  }

  /**
   * Get tags.
   *
   * Get tags. Auth not required
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTags$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags(params?: GetTags$Params, context?: HttpContext): Observable<{
'tags': Array<string>;
}> {
    return this.getTags$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'tags': Array<string>;
}>): {
'tags': Array<string>;
} => r.body)
    );
  }

}
