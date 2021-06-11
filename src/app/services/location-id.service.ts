import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationIdService {

  constructor(private http: HttpClient) { }

  locationLookup(location: number[]): Observable<any>{
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${location[0]}&lon=${location[1]}&format=jsonv2`

    return this.http.get<any>(url)

  }
}
