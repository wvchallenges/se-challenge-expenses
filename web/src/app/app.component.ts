import { Component } from '@angular/core';
import { ExpenseSummary } from './expense-summary';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Import CSV';

  fileToUpload: File;
  expenseSummary: Array<ExpenseSummary>;

  constructor() {
    this.expenseSummary = <Array<ExpenseSummary>> [];
  }

  upload() {
    this.makeFileRequest(environment.api + "/expenses/import", [],
      this.fileToUpload).then((result) => {
        this.expenseSummary = <Array<ExpenseSummary>> result;
      }, (error) => {
        console.error(error);
      });
  }

  fileChangeEvent(fileInput: any){
    this.fileToUpload = <File> fileInput.target.files[0];
  }

  makeFileRequest(url: string, params: Array<string>, file: File) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      formData.append('data', file, file.name);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }

}
