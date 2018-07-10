import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingList, ShoppingListItem } from '../../models/shoppingList';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from '../../services/shopping-List.service';
import { pluck, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {

  list$: Observable<ShoppingList>;

  editingModel: ShoppingList;
  newItem = new ShoppingListItem();

  currentId: number;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private service: ShoppingListService ) { }

  ngOnInit() {
    this.list$ = this.route.params.pipe(
      pluck('id'),
      switchMap(id =>
        {
          if (id === 'new')
            return of(new ShoppingList());
          else
            return this.service.get(+id);
        }
      )
    );
  }

  onAddItem(item: ShoppingListItem, shoppingList: ShoppingList){
    if (!shoppingList.items){
      shoppingList.items = [];
    }
    shoppingList.items.push(item);
    this.service.addItem(item, shoppingList.id).subscribe(()=>console.log("item added"));
  }

  onUpdateItem(item: ShoppingListItem, shoppingList: ShoppingList){
    this.service.updateItem(item, shoppingList.id).subscribe(()=>console.log("item updated"));
  }

  onSaveList(list: ShoppingList){
    this.service.save(list).subscribe(update=> 
      this.router.navigate(['shoppingList', update.id])  
    );
  }
}
