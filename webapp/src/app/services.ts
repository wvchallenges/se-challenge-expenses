import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

const jsonOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const fileOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/csv' })
};

const BASE_URL = 'http://localhost:8000';

@Injectable()
export class Services {

    constructor(private http: HttpClient) { }

    public uploadFile(file: File) {
        return this.http.post(BASE_URL + '/api/upload', file, fileOptions);
    }

    public getUploadedData() {
        return this.http.get('/api/food');
    }
}
