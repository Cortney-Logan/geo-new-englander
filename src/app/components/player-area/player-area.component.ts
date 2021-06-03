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


  constructor() { }

  ngOnInit(): void {
  }

  toggleRandomSpotSubmitted(randomSpot: Event){
    this.randomSpot = randomSpot;
    this.submitRandomSpot.emit(this.randomSpot);
  }

}
