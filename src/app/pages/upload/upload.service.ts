import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  token = localStorage.getItem('accesstoken');

  postVideos(data) {
    return this.http.post(`${environment.baseUrl}/api/videos?access_token=${this.token}`, data);
  }

}
