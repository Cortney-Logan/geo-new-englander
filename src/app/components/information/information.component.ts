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
  county: string ="";
  town: string="";

  constructor(private locationIdService: LocationIdService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log("on change triggered")

    if (this.randomSpot) {
      this.locationIdService
        .locationLookup(this.randomSpot)
        .subscribe((locationDetails) => {
          this.locationDetails = locationDetails;
          console.log(locationDetails)
          this.determineDetails();
        });  
    }
  }

  determineDetails(): void{
    this.county = this.locationDetails.address.county;
    if(this.locationDetails.address.town){
      this.town = this.locationDetails.address.town
    } else if(this.locationDetails.address.city){
      this.town = this.locationDetails.address.city
    } else if(this.locationDetails.address.village){
      this.town = this.locationDetails.address.village
    } else if(this.locationDetails.address.hamlet){
      this.town = this.locationDetails.address.hamlet
    }else if(this.locationDetails.address.city_district){
      this.town = this.locationDetails.address.city_district}

  }
}
