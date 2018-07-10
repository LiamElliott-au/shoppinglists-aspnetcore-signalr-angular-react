import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingList } from 'src/app/models/shoppingList';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit {

  @Input() Lists: ShoppingList[];

  @Output() InvalidateList = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  
}
