import { Component, OnInit } from '@angular/core';
import { Services } from '../services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [Services]
})
export class UploadComponent implements OnInit {

  constructor(
    private services: Services,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onFileSelect(files: FileList) {
    this.services.uploadFile(files[0]).subscribe(
      (success) => this.router.navigate['/results'],
      (error) => console.log(error));
  }
}
