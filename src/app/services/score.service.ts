import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  score: number = 100;

  constructor() {}

  subtract(points: number): void {
    this.score = this.score - points;
  }

  reset(): void {
    this.score = 100;
  }
}
