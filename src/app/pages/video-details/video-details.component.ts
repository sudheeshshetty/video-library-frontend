import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconLibraries } from '@nebular/theme'
import { VideoDetailsService } from './video-details.service';

@Component({
  selector: 'ngx-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {
  videoid;
  like: boolean = false;
  dislike: boolean = false;
  data;

  constructor(private activatedroute: ActivatedRoute,
    private iconsLibrary: NbIconLibraries,
    private videoDetailsService: VideoDetailsService,
    private router: Router
  ) {
    this.iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    this.videoid = this.activatedroute.snapshot.params.id
    this.videoDetailsService.getVideoDetails(this.videoid).subscribe((data: any) => {
      this.data = data
    })
    this.videoDetailsService.getLikes(this.videoid).subscribe((data: any) => {
      if (data[0]) {
        this.like = data[0].selected;
        localStorage.setItem('like', JSON.stringify(data[0]))
      }
    }, (err) => {

    })
    this.videoDetailsService.getDisLikes(this.videoid).subscribe((data: any) => {
      if (data[0]) {
        this.dislike = data[0].selected;
        localStorage.setItem('dislike', JSON.stringify(data[0]))
      }
    }, (err) => {

    })
  }

  onlike() {
    let token = localStorage.getItem('accesstoken')
    if (!token) {
      console.log(token)
      localStorage.setItem('page', '/pages/details')
      localStorage.setItem('param', this.videoid)
      this.router.navigate(['/auth/login']);
    } else {
      this.like = !this.like;
      if (this.dislike && this.like) {
        this.dislike = !this.dislike;
        this.videoDetailsService.revertDislike(this.videoid).subscribe((data) => {
          localStorage.setItem('dislike', JSON.stringify(data))
        });
      }
      this.videoDetailsService.revertlike(this.videoid).subscribe((data) => {
        localStorage.setItem('like', JSON.stringify(data))
      })
    }
  }

  ondislike() {
    let token = localStorage.getItem('accesstoken')
    if (!token) {
      localStorage.setItem('page', '/pages/details')
      localStorage.setItem('param', this.videoid)
      this.router.navigate(['/auth/login']);
    } else {
      this.dislike = !this.dislike
      if (this.like && this.dislike) {
        this.like = !this.like;
        this.videoDetailsService.revertlike(this.videoid).subscribe((data) => {
          localStorage.setItem('like', JSON.stringify(data))
        });
      }
      this.videoDetailsService.revertDislike(this.videoid).subscribe((data) => {
        localStorage.setItem('dislike', JSON.stringify(data))
      })
    }
  }
}
