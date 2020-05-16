import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DataCollectionComponent } from './data-collection/data-collection.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'covid19app';
}
