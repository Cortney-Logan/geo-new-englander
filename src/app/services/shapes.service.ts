import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {Border} from '../Border'

@Injectable({
  providedIn: 'root'
})
export class ShapesService {

  constructor(private http: HttpClient) { }

  // returns an observable of the serialized GeoJson object
  getStateShapes(){
    return this.http.get('/assets/data/outlines.json')
  }

  // returns border of specific state outline
  getStateOutline(state: string){
    let states;
    this.getStateShapes().subscribe(state => {states = state});
    console.log(states)
    console.log("retrieved states")
    return 1;
  }

}
