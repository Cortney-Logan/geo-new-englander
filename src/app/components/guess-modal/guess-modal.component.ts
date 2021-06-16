import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

import { CountiesService } from 'src/app/services/counties.service';
import { LocationIdService } from 'src/app/services/location-id.service';
import { ScoreService } from 'src/app/services/score.service';
import { ToggleService } from 'src/app/services/toggle.service';

import { Counties } from '../../Counties';

@Component({
  selector: 'app-guess-modal',
  templateUrl: './guess-modal.component.html',
  styleUrls: ['./guess-modal.component.css'],
})
export class GuessModalComponent implements OnInit, OnChanges {
  counties: string[] = [];
  selectedCounty: any = null;
  message: string = '';

  @Input() guess: boolean = false;
  @Input() selectedState?: string;

  constructor(
    private countiesService: CountiesService,
    private locationIdService: LocationIdService,
    private scoreService: ScoreService,
    public toggleService: ToggleService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    // access counties from assets
    this.countiesService.getCounties().subscribe((counties) => {
      const temp: any = counties;
      // isolates counties for selected state and sets it to this.counties to populate dropdown
      temp.forEach((stateCounties: Counties) => {
        if (stateCounties.state === this.selectedState) {
          this.counties = stateCounties.counties;
        }
      });
    });
  }

  // when guess is clicked
  submitGuess() {
    // guard clause to make sure that a county has been selected
    if (this.selectedCounty) {
      // if the selected county matches the actual county, the game is over and they win
      if (this.selectedCounty === this.locationIdService.county) {
        console.log('match!');
        this.message = 'Congratulations, you win!';
        // populate information
        this.toggleService.toggleLocationInformationOn();
        this.toggleService.toggleShowPlayAgainOn();
      }
      // if the selected county does not match the actual county score is reduced
      else {
        console.log('no match');
        this.message = 'Sorry, that is not correct';
        this.scoreService.subtract(10);
      }
    } else {
      this.message = 'Please select a county to submit a guess';
    }
  }
  // when cancel is clicked, guess is set to false to close the modal
  toggleGuessModal() {
    this.toggleService.toggleGuessModalOff();
  }
}
