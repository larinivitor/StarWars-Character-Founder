import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class SwapiService {

  public urlPeople = 'https://swapi.co/api/people/';

  constructor(public http: HttpClient) { }

  peopleSearch(searchTerm: string): Observable<any> {
    return this.http.get(`${this.urlPeople}?search=${searchTerm}`);

  }
  getPeopleById(id: string) {
    return this.http.get(`${this.urlPeople}/${id}`);
  }

  getPropertieDataByArrayUrl(arrayUrl: any[]) {
    const observableBatch = [];
    for (let i = 0; i < arrayUrl.length; i++) {
      observableBatch.push(this.http.get(arrayUrl[i]));
    }

    return forkJoin(observableBatch);
  }

}
