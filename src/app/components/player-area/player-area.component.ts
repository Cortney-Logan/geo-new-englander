import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.css']
})
export class PlayerAreaComponent implements OnInit {
  @Input() selectedState?: string;
  @Input() states: any;

  randomSpot: any;

  @Output() submitRandomSpot: EventEmitter<any> = new EventEmitter();
  @Output() submitQuit: EventEmitter<any> = new EventEmitter();
  @Output() triggerGuess: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  // when start is clicked in buttons, submits random spot to app
  toggleRandomSpotSubmitted(randomSpot: Event){
    this.randomSpot = randomSpot;
    this.submitRandomSpot.emit(this.randomSpot);
  }

  // when quit is clicked in buttons, submits quit to app component
  toggleQuit(){
    this.submitQuit.emit();
  }

  // when guess is clicked in buttons, submits guess to app component
  toggleGuess(){
    this.triggerGuess.emit();
  }

}
