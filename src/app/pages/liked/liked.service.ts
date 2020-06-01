import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikedService {

  userId = JSON.parse(localStorage.getItem('userDetails')).id;
  accessToken = localStorage.getItem('accesstoken');

  constructor(private http: HttpClient) { }

  getVideos() {
    return this.http.get(`${environment.baseUrl}/api/likes?filter[where][userId]=${this.userId}&filter[where][selected]=true&filter[include]=video&access_token=${this.accessToken}`);
  }
}
