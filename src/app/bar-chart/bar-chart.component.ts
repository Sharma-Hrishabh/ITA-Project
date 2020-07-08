import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  public chartType: string = 'horizontalBar';
  public date: string = "";
  public country: string = "";

  public chartDatasets: Array<any> = [
    { data: [], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth, public datePipe: DatePipe) {
    // this.date = this.datePipe.transform(new Date(Date.now() - 12096e5), 'MM-dd-yyyy');
    // this.country = "India";
    // this.getStats();
    setInterval(()=>{
    this.date = this.datePipe.transform(new Date(Date.now() - 12096e5), 'MM-dd-yyyy');
    this.country = "India";
    this.getStats();
    },10000);
  }

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  private async getStats(): Promise<any> {
    const countryRef = this.firestore.collection('country_stats/'+this.date+"/"+this.country+"/");
    const snapshot = await countryRef.ref.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      this.chartLabels.push(doc.id);
      this.chartDatasets[0].data.push(doc.data["active"]);
    });
    console.log(this.chartLabels);
    console.log(this.chartDatasets);
    console.log("ascasc");
  }
}
