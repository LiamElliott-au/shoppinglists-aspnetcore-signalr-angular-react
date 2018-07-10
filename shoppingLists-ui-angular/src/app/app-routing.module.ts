import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDetailsComponent } from './components/list-details/list-details.component';

const routes: Routes = [
  {path: 'shoppingList/:id', component: ListDetailsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
