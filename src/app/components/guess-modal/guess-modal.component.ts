import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-guess-modal',
  templateUrl: './guess-modal.component.html',
  styleUrls: ['./guess-modal.component.css'],
})
export class GuessModalComponent implements OnInit {
  counties: string[] = ["one", "two", "three"];
  
  @Input() guess: boolean = false;

  @Output() resetGuess: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  toggleGuess() {
    this.guess = false;
    this.resetGuess.emit();
  }
}
