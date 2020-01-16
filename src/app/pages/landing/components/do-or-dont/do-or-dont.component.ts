import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'landing-do-or-dont',
  templateUrl: './do-or-dont.component.html',
  styleUrls: ['./do-or-dont.component.css']
})
export class DoOrDontComponent implements OnInit {

  @Output() isClicked = new EventEmitter<boolean>();

  public buttonText = 'Do. Or Do not. There is no try.';

  constructor() {}

  ngOnInit() {}

  onClick(){
    this.isClicked.emit(true);
  }
}















