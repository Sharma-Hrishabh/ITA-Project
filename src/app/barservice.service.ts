import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarserviceService {

  public date: string = "";
  public country: string = "";
  public chartDatasets: Array<any> = [
    { data: [], label: 'My First dataset' }
  ];
  public chartLabels: Array<any> = [];
  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth, public datePipe: DatePipe) {
    this.date = this.datePipe.transform(new Date(Date.now() - 12096e5), 'MM-dd-yyyy');
    this.country = "India";
  }

  public async getStats(): Promise<any> {
    const countryRef = this.firestore.collection('country_stats/'+this.date+"/"+this.country+"/");
    const snapshot = await countryRef.ref.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      this.chartLabels.push(doc.id);
      this.chartDatasets[0].data.push(doc.data()["active"]);
    });
    var obj ={ "labels": this.chartLabels, "datasets": this.chartDatasets}
    console.log("HHH");
    console.log(obj);
    return obj;
  }
}
