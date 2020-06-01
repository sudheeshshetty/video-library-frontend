import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { UploadService } from './upload.service';

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
    thumbnail: false,
    text: ''
  }
  thumbnailProgress = 0
  videoProgress = 0


  constructor(private uploadservice: UploadService) { }

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
      this.videouploads3(image, 'image-angular-bucket');
    }
    let file = this.selectedFiles.item(0);
    this.videouploads3(file, 'video-angular-bucket');
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  selectImage(event) {
    this.selectedImage = event.target.files;
  }

  videouploads3(file, bucketName) {
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
        region: 'ap-south-1'
      }
    );
    const params = {
      Bucket: bucketName,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    // bucket.upload(params, (err, data) => {
    //   if (err) {
    //     this.error.text = 'There was an error uploading your file. Please try later';
    //     // console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }
    //   this.error.text = ''
    //   console.log('Successfully uploaded file.', data);
    //   if (bucketName == 'video-angular-bucket') {
    //     this.data.url = data.Location
    //     // this.uploadservice.
    //   } else {
    //     this.data.thumbnail = data.Location
    //   }
    //   return true;
    // });
    bucket.upload(params).on('httpUploadProgress', (evt) => {
      console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      if (bucketName == 'video-angular-bucket') {
        this.videoProgress = Math.floor((evt.loaded * 100) / evt.total);
      } else {
        this.thumbnailProgress = Math.floor((evt.loaded * 100) / evt.total);
      }
    }).send((err, s3data) => {
      this.error.text = '';
      if (err) {
        this.resetData();
        this.error.text = 'There was an error uploading your file. Please try later';
        return false;
      }
      if (bucketName == 'video-angular-bucket') {
        this.data.url = s3data.Location
        this.uploadservice.postVideos(this.data).subscribe((uploadedData) => {
          this.resetData();
        })
      } else {
        this.data.thumbnail = s3data.Location
      }
      return true;
    });
  }

  resetData() {
    this.data = {
      name: '',
      description: '',
      url: '',
      thumbnail: false
    }
    this.videoProgress = 0;
    this.thumbnailProgress = 0;
  }

}
