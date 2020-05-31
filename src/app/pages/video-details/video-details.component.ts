import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbIconLibraries } from '@nebular/theme'

@Component({
  selector: 'ngx-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {
  videoid;
  like:boolean = false;
  dislike:boolean = false;
  data = {
    id: 1,
    name: 'Animal Video 1',
    url: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/Animal_5.mp4',
    thumbnail: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/ArtboardTwo.png'
  };

  constructor(private activatedroute: ActivatedRoute,
    private iconsLibrary: NbIconLibraries) {
    // this.iconLibraries.registerFontPack('ionicons');
    this.iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    this.videoid = this.activatedroute.snapshot.params.id
    console.log(this.videoid)
  }

  onlike() {
    console.log('like')
    this.like = !this.like
  }

  ondislike() {
    console.log('dislike')
    this.dislike = !this.dislike
  }
}
