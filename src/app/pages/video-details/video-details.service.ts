import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoDetailsService {

  constructor(private http: HttpClient) { }


  getVideoDetails(id) {
    return this.http.get(`${environment.baseUrl}/api/videos/${id}`);
  }

  getLikes(id) {
    let token = localStorage.getItem('accesstoken');
    let userId = JSON.parse(localStorage.getItem('userDetails')) ? JSON.parse(localStorage.getItem('userDetails')).id : undefined
    return this.http.get(`${environment.baseUrl}/api/likes?filter={"where":{"and":[{"userId":"${userId}"},{"videoId":"${id}"}]}}&access_token=${token}`);
  }

  getDisLikes(id) {
    let token = localStorage.getItem('accesstoken');
    let userId = JSON.parse(localStorage.getItem('userDetails')) ? JSON.parse(localStorage.getItem('userDetails')).id : undefined
    return this.http.get(`${environment.baseUrl}/api/dislikes?filter={"where":{"and":[{"userId":"${userId}"},{"videoId":"${id}"}]}}&access_token=${token}`);
  }

  revertlike(id) {
    let token = localStorage.getItem('accesstoken');
    let userId = JSON.parse(localStorage.getItem('userDetails')) ? JSON.parse(localStorage.getItem('userDetails')).id : undefined
    let like = JSON.parse(localStorage.getItem('like'))
    let url = `${environment.baseUrl}/api/likes`
    if (like) {
      like.selected = !like.selected
      url = `${environment.baseUrl}/api/likes/${like.id}`
    } else {
      like = {
        userId: userId,
        videoId: id,
        selected: true
      }
    }
    return this.http.put(url, like)
  }

  revertDislike(id) {
    let token = localStorage.getItem('accesstoken');
    let userId = JSON.parse(localStorage.getItem('userDetails')) ? JSON.parse(localStorage.getItem('userDetails')).id : undefined
    let dislike = JSON.parse(localStorage.getItem('dislike'))
    let url = `${environment.baseUrl}/api/dislikes`
    if (dislike) {
      dislike.selected = !dislike.selected
      url = `${environment.baseUrl}/api/dislikes/${dislike.id}`
    } else {
      dislike = {
        userId: userId,
        videoId: id,
        selected: true
      }
    }
    return this.http.put(url, dislike)
  }
}
