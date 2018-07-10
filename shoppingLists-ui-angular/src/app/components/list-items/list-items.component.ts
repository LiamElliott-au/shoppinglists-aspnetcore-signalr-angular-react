import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingListItem, ShoppingList } from '../../models/shoppingList';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  @Input() ShoppingList: ShoppingList;
  @Output() AddItem = new EventEmitter<{item: ShoppingListItem, shoppingList: ShoppingList}>();
  @Output() UpdateItem = new EventEmitter<{item: ShoppingListItem,shoppingList: ShoppingList}>();
  
  newItem = new ShoppingListItem();
  constructor( ) { }

  ngOnInit() {
  }

  addItem(item: ShoppingListItem){
    
    var itemToSave = {item: item, shoppingList: this.ShoppingList};
    this.AddItem.next(itemToSave);
    this.newItem = new ShoppingListItem();
  }

  onSelectionChanged(changes: MatSelectionListChange){
    
    const item = this.ShoppingList.items.find(i => i.id == changes.option.value);
    item.purchased = changes.option.selected;
    this.UpdateItem.next({item: item, shoppingList: this.ShoppingList});

  }
}
