/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Profile } from '../../models/profile';

export interface UnfollowUserByUsername$Params {

/**
 * Username of the profile you want to unfollow
 */
  username: string;
}

export function unfollowUserByUsername(http: HttpClient, rootUrl: string, params: UnfollowUserByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'profile': Profile;
}>> {
  const rb = new RequestBuilder(rootUrl, unfollowUserByUsername.PATH, 'delete');
  if (params) {
    rb.path('username', params.username, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'profile': Profile;
      }>;
    })
  );
}

unfollowUserByUsername.PATH = '/profiles/{username}/follow';
