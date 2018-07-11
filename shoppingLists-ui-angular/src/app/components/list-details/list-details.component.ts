import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingList, ShoppingListItem } from '../../models/shoppingList';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from '../../services/shopping-List.service';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { of, merge } from 'rxjs';
import { SignalRService } from '../../services/signalr.service';

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
    private service: ShoppingListService,
    private signalR: SignalRService ) { }

  ngOnInit() {
    const param$ = this.route.params.pipe(
      pluck('id'),
      tap(id => {if (this.currentId) this.signalR.leaveShoppingList(this.currentId)}),
      tap(id => {this.signalR.joinShoppingList(+id); this.currentId = +id}),
      switchMap(id =>
        {
          if (id === 'new')
            return of(new ShoppingList());
          else
            return this.service.get(+id);
        }
      )
    );

    const itemRefresh$ = merge(this.signalR.shoppingListItemAdded, this.signalR.shoppingListItemUpdated).pipe(
      switchMap(()=> this.service.get(this.currentId))
    );

    this.list$ = merge(param$, this.signalR.shoppingListUpdated, itemRefresh$);

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
