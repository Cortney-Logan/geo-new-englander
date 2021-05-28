import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {
  start: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  toggleStart(): void{
    this.start = false;
  }
}
