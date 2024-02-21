/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseApiClient } from '../base-api-client';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createUser } from '../fn/user-and-authentication/create-user';
import { CreateUser$Params } from '../fn/user-and-authentication/create-user';
import { getCurrentUser } from '../fn/user-and-authentication/get-current-user';
import { GetCurrentUser$Params } from '../fn/user-and-authentication/get-current-user';
import { login } from '../fn/user-and-authentication/login';
import { Login$Params } from '../fn/user-and-authentication/login';
import { updateCurrentUser } from '../fn/user-and-authentication/update-current-user';
import { UpdateCurrentUser$Params } from '../fn/user-and-authentication/update-current-user';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserAndAuthenticationApiClient extends BaseApiClient {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/users/login';

  /**
   * Existing user login.
   *
   * Login for existing user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'user': User;
}>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * Existing user login.
   *
   * Login for existing user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<{
'user': User;
}> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'user': User;
}>): {
'user': User;
} => r.body)
    );
  }

  /** Path part for operation `createUser()` */
  static readonly CreateUserPath = '/users';

  /**
   * Register a new user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params: CreateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'user': User;
}>> {
    return createUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Register a new user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params: CreateUser$Params, context?: HttpContext): Observable<{
'user': User;
}> {
    return this.createUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'user': User;
}>): {
'user': User;
} => r.body)
    );
  }

  /** Path part for operation `getCurrentUser()` */
  static readonly GetCurrentUserPath = '/user';

  /**
   * Get current user.
   *
   * Gets the currently logged-in user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser$Response(params?: GetCurrentUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'user': User;
}>> {
    return getCurrentUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Get current user.
   *
   * Gets the currently logged-in user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCurrentUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser(params?: GetCurrentUser$Params, context?: HttpContext): Observable<{
'user': User;
}> {
    return this.getCurrentUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'user': User;
}>): {
'user': User;
} => r.body)
    );
  }

  /** Path part for operation `updateCurrentUser()` */
  static readonly UpdateCurrentUserPath = '/user';

  /**
   * Update current user.
   *
   * Updated user information for current user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCurrentUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCurrentUser$Response(params: UpdateCurrentUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'user': User;
}>> {
    return updateCurrentUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Update current user.
   *
   * Updated user information for current user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCurrentUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCurrentUser(params: UpdateCurrentUser$Params, context?: HttpContext): Observable<{
'user': User;
}> {
    return this.updateCurrentUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'user': User;
}>): {
'user': User;
} => r.body)
    );
  }

}
