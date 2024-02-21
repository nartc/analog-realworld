/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseApiClient } from '../base-api-client';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { followUserByUsername } from '../fn/profile/follow-user-by-username';
import { FollowUserByUsername$Params } from '../fn/profile/follow-user-by-username';
import { getProfileByUsername } from '../fn/profile/get-profile-by-username';
import { GetProfileByUsername$Params } from '../fn/profile/get-profile-by-username';
import { Profile } from '../models/profile';
import { unfollowUserByUsername } from '../fn/profile/unfollow-user-by-username';
import { UnfollowUserByUsername$Params } from '../fn/profile/unfollow-user-by-username';

@Injectable({ providedIn: 'root' })
export class ProfileApiClient extends BaseApiClient {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getProfileByUsername()` */
  static readonly GetProfileByUsernamePath = '/profiles/{username}';

  /**
   * Get a profile.
   *
   * Get a profile of a user of the system. Auth is optional
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProfileByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfileByUsername$Response(params: GetProfileByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'profile': Profile;
}>> {
    return getProfileByUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a profile.
   *
   * Get a profile of a user of the system. Auth is optional
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProfileByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfileByUsername(params: GetProfileByUsername$Params, context?: HttpContext): Observable<{
'profile': Profile;
}> {
    return this.getProfileByUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'profile': Profile;
}>): {
'profile': Profile;
} => r.body)
    );
  }

  /** Path part for operation `followUserByUsername()` */
  static readonly FollowUserByUsernamePath = '/profiles/{username}/follow';

  /**
   * Follow a user.
   *
   * Follow a user by username
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `followUserByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  followUserByUsername$Response(params: FollowUserByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'profile': Profile;
}>> {
    return followUserByUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * Follow a user.
   *
   * Follow a user by username
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `followUserByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  followUserByUsername(params: FollowUserByUsername$Params, context?: HttpContext): Observable<{
'profile': Profile;
}> {
    return this.followUserByUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'profile': Profile;
}>): {
'profile': Profile;
} => r.body)
    );
  }

  /** Path part for operation `unfollowUserByUsername()` */
  static readonly UnfollowUserByUsernamePath = '/profiles/{username}/follow';

  /**
   * Unfollow a user.
   *
   * Unfollow a user by username
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unfollowUserByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  unfollowUserByUsername$Response(params: UnfollowUserByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'profile': Profile;
}>> {
    return unfollowUserByUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * Unfollow a user.
   *
   * Unfollow a user by username
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `unfollowUserByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unfollowUserByUsername(params: UnfollowUserByUsername$Params, context?: HttpContext): Observable<{
'profile': Profile;
}> {
    return this.unfollowUserByUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'profile': Profile;
}>): {
'profile': Profile;
} => r.body)
    );
  }

}
