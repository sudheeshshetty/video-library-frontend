import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule } from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { VideoDetailsComponent } from './video-details.component';



@NgModule({
  declarations: [VideoDetailsComponent],
  imports: [
    CommonModule,
    NbEvaIconsModule,
    NbIconModule
  ]
})
export class VideoDetailsModule {
}
