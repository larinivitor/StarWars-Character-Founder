import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BingImageService {

  public url = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?';
  public subscriptionKey = 'c722964be814445ba9b3fdbfe12f5d1e';

  constructor(public http: HttpClient) { }

  searchImageByName(searchTerm: string): Observable<any> {
    const headers = {
      headers: new HttpHeaders({ 'Ocp-Apim-Subscription-Key': this.subscriptionKey })
     };

    const url = `${this.url}q=${searchTerm}&count=2`;

    return this.http.get(url, headers);

  }
}
