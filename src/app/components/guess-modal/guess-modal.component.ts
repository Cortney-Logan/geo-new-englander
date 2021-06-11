import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

import { CountiesService } from 'src/app/services/counties.service';
import { Counties } from '../../Counties';

@Component({
  selector: 'app-guess-modal',
  templateUrl: './guess-modal.component.html',
  styleUrls: ['./guess-modal.component.css'],
})
export class GuessModalComponent implements OnInit, OnChanges {
  counties: string[] = [];
  selectedCounty: any="-- Pick A County --";

  @Input() guess: boolean = false;
  @Input() selectedState?: string;

  @Output() resetGuess: EventEmitter<any> = new EventEmitter();

  constructor(private countiesService: CountiesService) {}

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

  submitCounty(county: any){
    console.log('value submitted')
    console.log(this.selectedCounty)
  }

  // when guess is clicked
  submitGuess() {
    console.log('making a guess');
    console.log()
  }
  // when cancel is clicked, guess is set to false to close the modal
  toggleGuessModal() {
    this.guess = false;
    this.resetGuess.emit();
  }
}
