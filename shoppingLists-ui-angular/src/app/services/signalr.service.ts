import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { ShoppingList, ShoppingListItem } from '../models/shoppingList';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private _hubConnection: HubConnection;
      isConnected: boolean = false;


    shoppingListsRefresh = new Subject();
    shoppingListItemAdded = new Subject<ShoppingListItem>();
    shoppingListItemUpdated = new Subject<ShoppingListItem>();
    shoppingListUpdated = new Subject<ShoppingList>();

    constructor() {

    this.init();
   }

  private init() {

    this._hubConnection = new HubConnectionBuilder()
    .withUrl('http://localhost:18111/hubs/shoppingLists')
    .build();
  this._hubConnection.on('ShoppingListItem_Added', (item: ShoppingListItem) => {
        console.log('Item Added: ' + item.id);
        this.shoppingListItemAdded.next(item);
    });

    this._hubConnection.on('ShoppingListItem_Added', (item: ShoppingListItem) => {
        console.log("Item Added: " + item.id);
        this.shoppingListItemAdded.next(item);
    });

    this._hubConnection.on('ShoppingListItem_Updated', (item: ShoppingListItem) => {
        console.log('Item Updated: ' + item.id)
        this.shoppingListItemUpdated.next(item);
    });

    this._hubConnection.on('ShoppingList_Updated', (list: ShoppingList) => {
        console.log('ShoppingListUpdated: ' + list.id);
        this.shoppingListUpdated.next(list);
     });

     this._hubConnection.on('ShoppingLists_Refresh',() => {
        console.log('Refreshing Lists');

        this.shoppingListsRefresh.next();
     });

    this._hubConnection.onclose(e=> {
        this.isConnected = false;
        if (e){
            console.log('Hub connection closed due to the following error' + e.name);
            console.log(e.message);
            this.connect();
        }
        else{
            console.log('Hub connection closed');
        }
    });
  }

  connect(){

    this._hubConnection.start()
    .then(() => {
        this.isConnected = true;
        console.log('Hub connection started');
    })
    .catch(err => {
        this.isConnected = false;
        console.log('Error while establishing connection')
    });

  }

  joinShoppingList(id: number){

    this._hubConnection.invoke('JoinList', id);
  }

  leaveShoppingList(id: number){
    this._hubConnection.invoke('LeaveList', id);
  }
}
