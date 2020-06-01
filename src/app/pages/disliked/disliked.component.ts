import { Component, OnInit } from '@angular/core';
import { DislikedService } from './disliked.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-disliked',
  templateUrl: './disliked.component.html',
  styleUrls: ['./disliked.component.scss']
})
export class DislikedComponent implements OnInit {

  data: any = [];
  constructor(
    private dislikedService: DislikedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dislikedService.getVideos().subscribe((data) => {
      this.data = data;
    })
  }

  onClick(id) {
    this.router.navigate(['/pages/details', id]);
  }

}
