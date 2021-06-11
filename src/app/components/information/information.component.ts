import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { LocationIdService } from '../../services/location-id.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit, OnChanges {
  @Input() randomSpot?: number[];
  @Input() quit: boolean = false;
  
  locationDetails: any;
  county: string = '';
  town: string = '';

  constructor(private locationIdService: LocationIdService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    // if random spot exists
    if (this.randomSpot) {
      // users location service to look up details about random spot
      this.locationIdService
        .locationLookup(this.randomSpot)
        .subscribe((locationDetails) => {
          this.locationDetails = locationDetails;

          console.log(locationDetails);

          // calls determine details method to accurately set
          this.determineDetails();
        });
    }
  }

  // isolates relevant details from location lookup
  determineDetails(): void {
    // county = county
    this.county = this.locationDetails.address.county;

    // town does not always exist, set town to city, village, hamlet, or city_district if town does not exist
    if (this.locationDetails.address.town) {
      this.town = this.locationDetails.address.town;
    } else if (this.locationDetails.address.city) {
      this.town = this.locationDetails.address.city;
    } else if (this.locationDetails.address.village) {
      this.town = this.locationDetails.address.village;
    } else if (this.locationDetails.address.hamlet) {
      this.town = this.locationDetails.address.hamlet;
    } else if (this.locationDetails.address.city_district) {
      this.town = this.locationDetails.address.city_district;
    }
  }
}
