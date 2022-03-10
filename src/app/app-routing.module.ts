import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosModule } from './todos/todos.module';

const routes: Routes = [
  {
    path:'todo',
    loadChildren: () => import('./todos/todos.module').then(m => TodosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
