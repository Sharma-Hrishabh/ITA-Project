import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';

@Component({
  selector: 'app-data-collection',
  templateUrl: './data-collection.component.html',
  styleUrls: ['./data-collection.component.css']
})
export class DataCollectionComponent implements OnInit {

  patient : Patient = {
    id:0,
    first_name:"",
    last_name:"",
    state:"",
    city:"",
    contactno:""
  };

  collectPatientDetails() {
    console.log(this.patient.first_name);
  }
 
  constructor() { }

  ngOnInit(): void {
  }

}
