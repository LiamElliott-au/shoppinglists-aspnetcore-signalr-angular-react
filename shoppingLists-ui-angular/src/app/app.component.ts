import { Component } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { ShoppingList } from './models/shoppingList';
import { ShoppingListService } from './services/shopping-List.service';
import { switchMap } from 'rxjs/operators';
import { SignalRService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  lists$: Observable<ShoppingList>;
  refresh$ = new Subject<any>();

  constructor(private service: ShoppingListService, private signalRService: SignalRService) {

  }

  ngOnInit(){
    var refresh$ = this.signalRService.shoppingListsRefresh.pipe(
      switchMap(_ => this.service.getAll())
    )

    this.lists$ = merge(this.service.getAll(), refresh$);
  }
}
