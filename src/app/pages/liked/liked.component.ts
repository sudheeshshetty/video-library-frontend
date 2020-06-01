import { Component, OnInit } from '@angular/core';
import { LikedService } from './liked.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss']
})
export class LikedComponent implements OnInit {

  data: any = [];
  constructor(
    private likedService: LikedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.likedService.getVideos().subscribe((data) => {
      this.data = data;
    })
  }

  onClick(id) {
    this.router.navigate(['/pages/details', id]);
  }


}
