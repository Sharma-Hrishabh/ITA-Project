import { Component,ViewChild } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DataCollectionComponent } from './data-collection/data-collection.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MatSidenav } from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatExpansionPanelDescription } from '@angular/material/expansion';
import { MatExpansionPanelHeader } from '@angular/material/expansion';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'COVID-19-InfoHub';
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore,public auth: AngularFireAuth) {
    this.items = firestore.collection('items').valueChanges();
  }
  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
