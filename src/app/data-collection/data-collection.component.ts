import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// import { } from '@angular/fire'

@Component({
  selector: 'app-data-collection',
  templateUrl: './data-collection.component.html',
  styleUrls: ['./data-collection.component.css']
})
export class DataCollectionComponent implements OnInit {

  patient : Patient = {
    id:"",
    first_name:"",
    last_name:"",
    age_group:"",
    state:"",
    city:"",
    contactno:"",
    contamination_status: false,
    contamination_reason: ""
  };

  public async collectPatientDetails(): Promise<any> {
    console.log(this.patient);
    var user = await this.auth.currentUser
    if (!user) 
      return alert("Please 'Login with Google' to submit");
    this.patient.id = await user.uid
    console.log(this.patient);
    //firestore.
  }
 
  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

}
