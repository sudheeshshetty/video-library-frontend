import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  userLogout() {
    const token = localStorage.getItem('accesstoken');
    this.http.post(`${environment.baseUrl}/api/users/logout?access_token=${token}`, {
    }).subscribe(data => { 
      localStorage.clear();
    });
  }
}
