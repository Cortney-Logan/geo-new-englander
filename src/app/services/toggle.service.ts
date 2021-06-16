import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  showGuessModal: boolean = false;
  showLocationInformation: boolean = false;
  start: boolean = true;
  showPlayAgain: boolean = false;

  constructor() {}

  toggleGuessModalOn(): void {
    this.showGuessModal = true;
  }

  toggleGuessModalOff(): void {
    this.showGuessModal = false;
  }

  toggleLocationInformationOn(): void {
    this.showLocationInformation = true;
  }

  toggleLocationInformationOff(): void {
    this.showLocationInformation = false;
  }

  toggleShowPlayAgainOn(): void{
    this.showPlayAgain = true;
  }

  toggleShowPlayAgainOff(): void{
    this.showPlayAgain = false;
  }

  toggleStartOn(): void {
    this.start = true;
  }

  toggleStartOff(): void {
    this.start = false;
  }
}
