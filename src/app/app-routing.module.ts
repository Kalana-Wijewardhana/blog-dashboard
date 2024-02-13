import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboadComponent } from './dashboad/dashboad.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';

const routes: Routes = [
  {path:'',component:DashboadComponent},
  {path:'categories', component:CategoriesComponent},
  { path:'posts',component:AllPostComponent},
  { path:'posts/new', component:NewPostComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
