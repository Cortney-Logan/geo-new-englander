import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';

import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnChanges {
  @Input() randomSpot: any;

  center: any = null;

  @Output() submitMove: EventEmitter<any> = new EventEmitter();

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (!this.center) {
      this.center = this.randomSpot;
    }
  }

  moveNorth(): void {
    const newCenter = [this.center[0] + 0.1, this.center[1]];
    this.center = newCenter;
    this.submitMove.emit(newCenter);
    this.scoreService.subtract(1);
  }

  moveSouth(): void {
    const newCenter = [this.center[0] - 0.1, this.center[1]];
    this.center = newCenter;
    this.submitMove.emit(newCenter);
    this.scoreService.subtract(1);
  }

  moveEast(): void {
    const newCenter = [this.center[0], this.center[1] + 0.1];
    this.center = newCenter;
    this.submitMove.emit(newCenter);
    this.scoreService.subtract(1);
  }

  moveWest(): void {
    const newCenter = [this.center[0], this.center[1] - 0.1];
    this.center = newCenter;
    this.submitMove.emit(newCenter);
    this.scoreService.subtract(1);
  }

  moveReturn(): void {
    const newCenter = this.randomSpot;
    this.center = newCenter;
    this.submitMove.emit(newCenter);
    this.scoreService.subtract(1);
  }
}
