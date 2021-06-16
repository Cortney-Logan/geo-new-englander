import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { LocationIdService } from '../../services/location-id.service';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit, OnChanges {
  @Input() randomSpot?: number[];

  constructor(
    public locationIdService: LocationIdService,
    public toggleService: ToggleService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    // if random spot exists
    if (this.randomSpot) {
      this.locationIdService.getLocation(this.randomSpot);
    }
  }
}
