import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(`${environment.baseUrl}/api/users/login`, data)
      .pipe(switchMap((token: any) =>
        this.getUserdetails(token.userId, token.id)
          .pipe(
            map(userDetails => ({ token, userDetails })),
          )),
      );
  }
  getUserdetails(id, token) {
    return this.http.get(`${environment.baseUrl}/api/users/${id}?access_token=${token}`);
  }

}
