import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { LikedModule } from './liked/liked.module';
import { DislikedModule } from './disliked/disliked.module';
import { ProfileModule } from './profile/profile.module';
import { UploadModule } from './upload/upload.module';
import { VideoDetailsModule } from './video-details/video-details.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    LikedModule,
    DislikedModule,
    ProfileModule,
    UploadModule,
    VideoDetailsModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
