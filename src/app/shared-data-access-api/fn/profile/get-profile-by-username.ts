/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Profile } from '../../models/profile';

export interface GetProfileByUsername$Params {

/**
 * Username of the profile to get
 */
  username: string;
}

export function getProfileByUsername(http: HttpClient, rootUrl: string, params: GetProfileByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'profile': Profile;
}>> {
  const rb = new RequestBuilder(rootUrl, getProfileByUsername.PATH, 'get');
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

getProfileByUsername.PATH = '/profiles/{username}';
