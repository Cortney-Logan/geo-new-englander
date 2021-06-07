import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { RandomSpotService } from '../../services/random-spot.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {
  start: boolean = true;
  quit: boolean = false;
  guess: boolean = false;
  border?: any;
  randomSpot: number[] = [];

  @Input() selectedState?: string;
  @Input() states: any;

  @Output() submitRandomSpot: EventEmitter<any> = new EventEmitter();
  @Output() submitQuit: EventEmitter<any> = new EventEmitter();
  @Output() triggerGuess: EventEmitter<any> = new EventEmitter();

  constructor(private randomSpotService: RandomSpotService) {}

  ngOnInit(): void {}

  // when start is clicked: toggles start and picks random spot
  toggleStart(): void {
    this.start = false;
    this.getRandomSpot();
  }

  // when quit is quicked: toggles quit and 
  toggleQuit(): void{
    console.log("quit triggered in button component")
    this.quit = true;
    this.submitQuit.emit();
  }

  toggleGuess(): void {
    this.guess = true;
    this.triggerGuess.emit();
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
