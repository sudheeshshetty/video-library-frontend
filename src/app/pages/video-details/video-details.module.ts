import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule, NbSpinnerModule } from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { VideoDetailsComponent } from './video-details.component';
import { VideoDetailsService } from './video-details.service';



@NgModule({
  providers: [VideoDetailsService],
  declarations: [VideoDetailsComponent],
  imports: [
    CommonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSpinnerModule
  ]
})
export class VideoDetailsModule {
}
