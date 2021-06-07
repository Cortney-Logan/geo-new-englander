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
    this.shapesService.getStateShapes().subscribe((states) => {
      this.states = states;
      console.log(this.states);
    });
  }

  toggleStateSubmitted(state: Event) {
    this.selectedState = state;
  }

  toggleRandomSpotSubmitted(randomSpot: Event) {
    this.randomSpot = randomSpot;
  }

  toggleQuit(): void {
    this.quit = true;
  }

  toggleGuess() {
    this.guess = true;
    console.log("guess triggered")
    console.log("guess is ", this.guess)
  }

  resetGuess(){
    this.guess = false;
  }
}
