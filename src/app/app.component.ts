import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DataCollectionComponent } from './data-collection/data-collection.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'covid19app';
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
}
