import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MathAssignment} from "../models/mathassignment";
import { Option } from "../models/option";
import { BSPrice } from "../models/bsprice";
import { MonteCarlo } from "../models/montecarlo";
import { MathService } from '../services/math.service';
import { PlotfunctionComponent } from "./plotfunction.component";
import { TreegraphComponent } from "./treegraph.component";
import { HistogramComponent } from "./histogram.component";

@Component({
  selector: 'app-markovchain',
  template: `
  <div class="container">
  <h5>Under construction</h5> 
  </div>
  `
})

export class MarkovChainComponent {

 constructor(private router: Router, private mathservice: MathService) {
  }

 id:number;
 data:any;
 graph:any;
 type:string;
 option:Option;
 bsprice:BSPrice;
 Nsteps:number;
 mc:MonteCarlo;
 satt:number[];
 result:any;
 option_payoffs:any;
 showresults:boolean;
 filename:string;

  @Input() mathassignment: MathAssignment;
  // answer:Answer;

  ngOnInit() {
    this.showresults = false;
  }



 exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                // var innerValue = row[j] === null ? '' : row[j].toString();
                // if (row[j] instanceof Date) {
                //     innerValue = row[j].toLocaleString();
                // };
                // var result = innerValue.replace(/"/g, '""');
                // if (result.search(/("|,|\n)/g) >= 0) {
                //     result = '"' + result + '"';}
                // if (j > 0) {
                //     finalVal += ',';
                // finalVal += result;}
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0) {
                    result = '"' + result + '"';}
                if (j > 0) {
                    finalVal += ';';
                finalVal += result;}

            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        // csvFile = 'a; b\n c; d';

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }



downloadresults() {
  this.exportToCsv(this.filename, [
	['price',this.result.price],	
  ['david','123']
  ]);
}

  rerun() {
    var d = new Date();
    this.filename = 'result_' + d.toDateString() + ".csv";
    this.showresults = true;
    // this.genseries();this.option.K
    this.mc = new MonteCarlo(this.option);
    this.data = this.mc.geoBrownian_series(1,50);
    console.log('option',this.option);
    this.result = this.mc.priceOption(1,50,this.Nsteps,abc);

    console.log('Price European Call ',this.bsprice.EuropeanCall(this.option.S0,this.option.K,this.option.K,this.option.volatility,1));
    
    function abc(x) {
      if(x > 100) {
        return x - 100;
      } else {
        return 0;
      }
    }

    this.satt = this.mc.MonteCarlo(1,50,this.Nsteps,abc);
    //  console.log(satt);
    // console.log(this.data);
    // console.log('functions and constants');
    // console.log(math.round(math.e, 3));           // 2.718
    // console.log('rn',this.gaussian(0,1)());           // 2.718
  }


}

