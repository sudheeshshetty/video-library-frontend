import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LikedComponent } from './liked/liked.component';
import { DislikedComponent } from './disliked/disliked.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { AuthGuardService } from '../guards/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'liked',
      canActivate: [AuthGuardService],
      component: LikedComponent
    },
    {
      path: 'disliked',
      canActivate: [AuthGuardService],
      component: DislikedComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'upload',
      canActivate: [AuthGuardService],
      component: UploadComponent,
    },
    {
      path: 'details/:id',
      component: VideoDetailsComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
