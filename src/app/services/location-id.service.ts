import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationIdService {
  county: string = '';
  town: string = '';

  constructor(private http: HttpClient) {}

  // reverse look up using nominatim from random spot coordinates
  locationLookup(location: number[]): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${location[0]}&lon=${location[1]}&format=jsonv2`;

    return this.http.get<any>(url);
  }

  // calls location look up method and then isolates location details
  getLocation(location: number[]): void {
    // calls location lookup method
    this.locationLookup(location).subscribe((locationDetails) => {
      // isolates relevant details from location lookup
      console.log(locationDetails)

      // slice isolates the county name and removes " County from end"
      let countyTemp = locationDetails.address.county;
      this.county = countyTemp.slice(0, countyTemp.indexOf(' County'));

      // town does not always exist, set town to city, village, hamlet, or city_district if town does not exist
      if (locationDetails.address.town) {
        this.town = locationDetails.address.town;
      } else if (locationDetails.address.city) {
        this.town = locationDetails.address.city;
      } else if (locationDetails.address.village) {
        this.town = locationDetails.address.village;
      } else if (locationDetails.address.hamlet) {
        this.town = locationDetails.address.hamlet;
      } else if (locationDetails.address.city_district) {
        this.town = locationDetails.address.city_district;
      }
    });
  }
}
