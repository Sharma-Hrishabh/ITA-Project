import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  public chartType: string = 'line';
  public start_date: number;
  public date: string = "";
  public country: string = "";

  public chartDatasets: Array<any> = [
    { data: [], label: '' },
    { data: [], label: '' }
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth, public datePipe: DatePipe) {
    this.start_date = Date.now() - 2 * 12096e5;
    this.chartDatasets[0].label = "Afghanistan";
    this.chartDatasets[1].label = "Austria";
    setInterval(()=>{
      try {
        this.fetchCountries();
      } catch(err) {
        console.log(err);
      }
    }, 10000)
  }

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  private async fetchCountries(): Promise<any> {
    for (var i = 0; i < 7; i++) {
       this.date = this.datePipe.transform(new Date(this.start_date + i * 86400 * 1000), 'MM-dd-yyyy');
       await this.getStats();
       this.chartLabels.push(this.date);
    }
    console.log(this.chartLabels);
    console.log(this.chartDatasets);
  }

  private async getStats(): Promise<any> {
    this.country = this.chartDatasets[0].label;
    var countryRef = this.firestore.doc('country_stats/'+this.date+"/"+this.country+"/_country");
    var doc = await countryRef.ref.get();
    if (doc.exists)
      this.chartDatasets[0].data.push(doc.data()["active"]);
    else
      console.log("No doc found");

    this.country = this.chartDatasets[1].label;
    var countryRef = this.firestore.doc('country_stats/'+this.date+"/"+this.country+"/_country");
    var doc = await countryRef.ref.get();
    if (doc.exists)
      this.chartDatasets[1].data.push(doc.data()["active"]);
    else
      console.log("No doc found")
  }
}
