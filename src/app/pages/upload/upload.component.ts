import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'ngx-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  selectedFiles: FileList;
  selectedImage: FileList;
  data = {
    name: '',
    description: '',
    url: '',
    thumbnail: false
  }
  error = {
    name: false,
    url: false,
    thumbnail: false
  }


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.data.name)
    if (!this.data.name) {
      this.error.name = true
    }
    if (!this.selectedFiles) {
      this.error.url = true
    }
    if (this.selectedImage) {
      let image = this.selectedImage.item(0);
      this.videouploads3(image);
    }
    let file = this.selectedFiles.item(0);
    this.videouploads3(file);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  selectImage(event) {
    this.selectedImage = event.target.files;
  }

  videouploads3(file) {
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
        region: 'ap-south-1'
      }
    );
    const params = {
      Bucket: 'video-angular-bucket',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

}
