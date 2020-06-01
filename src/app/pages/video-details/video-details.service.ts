import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoDetailsService {

  constructor(private http: HttpClient) { }

  token = localStorage.getItem('accesstoken');
  userId = JSON.parse(localStorage.getItem('userDetails')) ? JSON.parse(localStorage.getItem('userDetails')).id : undefined

  getVideoDetails(id) {
    return this.http.get(`${environment.baseUrl}/api/videos/${id}`);
  }

  getLikes(id) {
    return this.http.get(`${environment.baseUrl}/api/likes?filter[where][userId]=${this.userId}&filter[where][videoId]=${id}&access_token=${this.token}`);
  }

  getDisLikes(id) {
    return this.http.get(`${environment.baseUrl}/api/dislikes?filter[where][userId]=${this.userId}&filter[where][videoId]=${id}&access_token=${this.token}`);
  }

  revertlike(id) {
    let like = JSON.parse(localStorage.getItem('like'))
    let url = `${environment.baseUrl}/api/likes`
    if (like) {
      like.selected = !like.selected
      url = `${environment.baseUrl}/api/likes/${like.id}`
    } else {
      like = {
        userId: this.userId,
        videoId: id,
        selected: true
      }
    }
    console.log(like, url)
    return this.http.put(url, like)
  }

  revertDislike(id) {
    let dislike = JSON.parse(localStorage.getItem('dislike'))
    let url = `${environment.baseUrl}/api/dislikes`
    if (dislike) {
      dislike.selected = !dislike.selected
      url = `${environment.baseUrl}/api/dislikes/${dislike.id}`
    } else {
      dislike = {
        userId: this.userId,
        videoId: id,
        selected: true
      }
    }
    console.log(dislike, url)
    return this.http.put(url, dislike)
  }
}
