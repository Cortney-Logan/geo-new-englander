import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { RandomSpotService } from '../../services/random-spot.service';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {
  border?: any;
  randomSpot: number[] = [];

  @Input() selectedState?: string;
  @Input() states: any;

  @Output() submitRandomSpot: EventEmitter<any> = new EventEmitter();

  constructor(
    private randomSpotService: RandomSpotService,
    public toggleService: ToggleService
  ) {}

  ngOnInit(): void {}

  // when start is clicked: toggles start and picks random spot
  toggleStart(): void {
    this.toggleService.toggleStartOff();
    this.getRandomSpot();
  }

  // when quit is clicked: toggles quit and emits new value to player area
  toggleQuit(): void {
    this.toggleService.toggleLocationInformationOn();
    this.toggleService.toggleShowPlayAgainOn();
  }

  // when guess is clicked: toggles guess and emits new value to player area
  toggleGuess(): void {
    this.toggleService.toggleGuessModalOn();
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
  // if play again is selected reset game
  toggleGameReset(): void {
    window.location.reload();
  }
}
