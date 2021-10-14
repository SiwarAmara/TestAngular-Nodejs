import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http : HttpClient) {}

 AddUrl(url:any) {
    return this.http.post(`${environment.BaseUrl}/AddshortUrls`,{fullUrl:url});
  }

  getAllUrl() {
    return this.http.get(`${environment.BaseUrl}/shortUrls`);
  }
  urlClicked(url:any) {
    return this.http.get(`${environment.BaseUrl}/clicked/${url}`);
  }
}
