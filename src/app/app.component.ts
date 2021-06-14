import { Component } from '@angular/core';
import { ShapesService } from './services/shapes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'geo-new-englander';

  public selectedState?: any;
  public states: any;
  public randomSpot?: any;
  public quit: boolean = false;
  public guess: boolean = false;

  constructor(private shapesService: ShapesService) {}

  ngOnInit(): void {
    // accesses states from shape service to pass to child components
    this.shapesService.getStateShapes().subscribe((states) => {
      this.states = states;
    });
  }

  // triggered after state is selected from map component; set selectedState value
  toggleStateSubmitted(state: Event) {
    this.selectedState = state;
  }

  // triggered after start has been clicked in buttons component and random spot is selected; sets random spot as value
  toggleRandomSpotSubmitted(randomSpot: Event) {
    this.randomSpot = randomSpot;
  }

  // triggered when quit button is clicked in player area, sets parent value of guess to true
  // this populates the information panel
  toggleQuit(): void {
    this.quit = true;
  }

  // triggered when guess button is clicked in player area, sets parent value of guess to true
  toggleGuess() {
    this.guess = true;
  }

  // triggered when cancel is clicked in modal, sets guess to false to close modal
  resetGuess() {
    this.guess = false;
  }
}
