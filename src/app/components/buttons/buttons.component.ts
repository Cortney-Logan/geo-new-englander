import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Border } from '../../Border';

import { RandomSpotService } from '../../services/random-spot.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {
  start: boolean = true;
  border?: any;
  randomSpot: number[] = [];

  @Input() selectedState?: string;
  @Input() states: any;

  @Output() submitRandomSpot: EventEmitter<any> = new EventEmitter();

  constructor(private randomSpotService: RandomSpotService) {}

  ngOnInit(): void {}

  // when start is clicked: toggles start and picks random spot
  toggleStart(): void {
    this.start = false;
    this.getRandomSpot();
  }

  // selects random spot by calling on random spot service
  getRandomSpot(): void {
    if (this.selectedState && this.states) {
      this.randomSpot = this.randomSpotService.getRandomSpot(
        this.selectedState,
        this.states
      );
    }

    this.submitRandomSpot.emit(this.randomSpot);
  }
}
