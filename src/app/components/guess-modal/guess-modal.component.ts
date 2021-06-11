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

  @Input() guess: boolean = false;
  @Input() selectedState?: string;

  @Output() resetGuess: EventEmitter<any> = new EventEmitter();

  constructor(private countiesService: CountiesService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log('guess-modal onchange triggered');

    this.countiesService.getCounties().subscribe((counties) => {
      const temp: any = counties;

      temp.forEach((stateCounties: Counties) => {
        if (stateCounties.state === this.selectedState) {
          this.counties = stateCounties.counties;
        }
      });
    });
  }

  toggleGuess() {
    this.guess = false;
    this.resetGuess.emit();
  }
}
