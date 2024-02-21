/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateUser } from '../../models/update-user';
import { User } from '../../models/user';

export interface UpdateCurrentUser$Params {
  
    /**
     * User details to update. At least **one** field is required.
     */
    body: {
'user': UpdateUser;
}
}

export function updateCurrentUser(http: HttpClient, rootUrl: string, params: UpdateCurrentUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'user': User;
}>> {
  const rb = new RequestBuilder(rootUrl, updateCurrentUser.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'user': User;
      }>;
    })
  );
}

updateCurrentUser.PATH = '/user';
