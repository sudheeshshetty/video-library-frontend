import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikedComponent } from './liked.component';
import { LikedService } from './liked.service';



@NgModule({
  providers:[LikedService],
  declarations: [LikedComponent],
  imports: [
    CommonModule
  ]
})
export class LikedModule { }
