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

  private file: File;
  constructor(
    private services: Services,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onFileSelect(files: FileList) {
    if (files.length > 0) {
       this.file = files[0];
      }
  }

  submit() {
    this.services.uploadFile(this.file).subscribe(
      (success) => this.router.navigate(['/results']),
      (error) => console.log(error));
  }
}
