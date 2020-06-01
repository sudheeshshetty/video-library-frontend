import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { FormsModule } from '@angular/forms';
import { NbProgressBarModule } from '@nebular/theme';



@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbProgressBarModule
  ]
})
export class UploadModule { }
