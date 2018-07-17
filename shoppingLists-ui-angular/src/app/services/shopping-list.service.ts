import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingList, ShoppingListItem } from '../models/shoppingList';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private readonly url = environment.serverAddress + '/shoppingLists';
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<ShoppingList>(this.url);
  }

  get(id: number){
    return this.http.get<ShoppingList>(this.url + '/' + id);
  }

  save(list: ShoppingList) : Observable<ShoppingList>{
    if (list.id){
      return this.update(list).pipe(map(result => list));
    }
    return this.add(list);
  }

  add(list: ShoppingList){
    return this.http.post<ShoppingList>(this.url, list);
  }

  update(list: ShoppingList){
    return this.http.put(this.url + '/' + list.id, list);
  }

  addItem(item: ShoppingListItem, shoppingListId: number) {
    return this.http.post<ShoppingListItem>(this.url + '/' + shoppingListId + '/Items', item);
  }

  updateItem(item: ShoppingListItem, shoppingListId: number) {
    return this.http.put(this.url + '/' + shoppingListId + '/Items/' + item.id, item);
  }

  saveItem(item: ShoppingListItem, shoppingListId: number) : Observable<ShoppingList>{
    if (item.id){
      return this.updateItem(item, shoppingListId).pipe(
        switchMap(result => this.get(shoppingListId)));
    }
    return this.addItem(item, shoppingListId).pipe(
      switchMap(result => this.get(shoppingListId)));
  }
}
