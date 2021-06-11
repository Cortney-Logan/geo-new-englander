import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CountiesService {

  constructor(private http: HttpClient) { }

  // returns an observable of the counties for each state
  getCounties(){
    return this.http.get('/assets/data/counties.json')
  }
}
