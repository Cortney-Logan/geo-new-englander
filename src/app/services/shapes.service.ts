import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ShapesService {

  constructor(private http: HttpClient) { }

  // returns an observable of the serialized GeoJson object
  getStateShapes(){
    return this.http.get('/assets/data/outlines.json')
  }
}
