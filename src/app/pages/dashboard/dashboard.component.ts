import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // data = [
  //   {
  //     id: 1,
  //     name: 'Animal Video 1',
  //     url: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/Animal_5.mp4',
  //     thumbnail: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/ArtboardTwo.png'
  //   }, {
  //     id: 2,
  //     name: 'Animal Video 2',
  //     url: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/Animal_5.mp4',
  //     thumbnail: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/ArtboardTwo.png'
  //   }, {
  //     id: 3,
  //     name: 'Animal Video 3',
  //     url: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/Animal_5.mp4',
  //     thumbnail: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/ArtboardTwo.png'
  //   }, {
  //     id: 4,
  //     name: 'Animal Video 4',
  //     url: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/Animal_5.mp4',
  //     thumbnail: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/ArtboardTwo.png'
  //   }, {
  //     id: 5,
  //     name: 'Animal Video 5',
  //     url: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/Animal_5.mp4',
  //     thumbnail: 'https://video-angular-bucket.s3.ap-south-1.amazonaws.com/ArtboardTwo.png'
  //   },
  // ]
  data: any = [];

  constructor(private router: Router,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getVideos().subscribe((data) => {
      this.data = data;
    })
  }

  onClick(id) {
    this.router.navigate(['/pages/details', id]);
  }
}
