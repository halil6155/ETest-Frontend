import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() totalQuestion:number;
  @Input() totalCategory:number;
  @Input() activeUser:number;
  @Input() disabledUser:number;
  constructor() { }

  ngOnInit(): void {
  }

}
