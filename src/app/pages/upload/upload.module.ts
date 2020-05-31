import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class UploadModule { }
