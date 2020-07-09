import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public reason: string;

  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth) {}

  ngOnInit(): void {
  }
  public searchQuery(){
  	var userColl = this.firestore.collection("patient_detail/").ref.where("contamination_reason", "==", this.reason);
    userColl.get().then(snapshots => {
    	alert(snapshots.size + " patients were affected this way.");
    });
  }
}
