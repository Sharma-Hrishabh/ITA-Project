import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataCollectionComponent } from './data-collection/data-collection.component';
import { HighlightsComponent } from './highlights/highlights.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'data-collection', component: DataCollectionComponent},
  {path:'highlights', component: HighlightsComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }