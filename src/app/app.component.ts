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
}
