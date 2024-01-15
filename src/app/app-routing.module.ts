import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboadComponent } from './dashboad/dashboad.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {path:'',component:DashboadComponent},
  {path:'categories', component:CategoriesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
