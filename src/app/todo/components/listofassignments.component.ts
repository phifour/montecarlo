import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EquationComponent} from "./equation.component";
import {MathAssignment} from "../models/mathassignment";
import {MathService} from '../services/math.service';
import { PlotfunctionComponent } from "./plotfunction.component";
import { TreegraphComponent } from "./treegraph.component";

@Component({
  selector: 'app-assignmentlist',
  template: `
  <div class="container">
    <p>This is a paragraph.</p>
    <h2>Math Assigments</h2>

    <div *ngFor="let x of [1,2]; let i = index">
        <h5>{{i}}</h5>
    </div>

    <label for="frmtype">Points</label>
    <select aria-label="Search by type" class="form-control" [(ngModel)]="type" id="frmtype">
                <option>15</option>
                <option>30</option>
                <option>60</option>
    </select>

    <button type="button" (click)="rerun()" class="btn btn-primary btn-block">New Random numbers</button>

    <app-plotfunction [(values)]="data"></app-plotfunction>


  </div>
  `
})

export class ListofassignmentsComponent {

 constructor(private router: Router, private mathservice: MathService) {
   this.data = [];
  }

 id:number;
 data:any;
 graph:any;
 type:string;

  @Input() mathassignment: MathAssignment;
  // answer:Answer;

  ngOnInit() {
    // this.answer = new Answer();
    // d3.select("body").transition()
    // .style("background-color", "black");
    //this.data = [{date:'1-May-12',close:58.13}, {date:'30-Apr-12',close:53.98}];
    //<app-treegraph [graph]="graph"></app-treegraph>
    this.genseries();
  }

    // dt = T/N;
    // t = np.linspace(0, T, N)
    // W = np.random.standard_normal(size = N) 
    // W = np.cumsum(W)*np.sqrt(dt) ### standard brownian motion ###
    // X = (r-0.5*sigma**2)*t + sigma*W 
    // S = S0*np.exp(X) ### geometric brownian motion ###
    // if (plot == 1):
    //     plt.plot(t, S)
    //     plt.show()
    // return (S[len(S)-1])

  genseries() {
    var N = 50;
    var T = 1;
    var h = T/N;
    //var x = [];
    var w = [];
    var grn = this.gaussian(0,1);
    this.data = [];
    var sum = 0;
    var sigma = 0.6;
    var r = 0.1;
    for (var i=0;i<N;i++) {
      var rn = grn();
      var x = h*i*(r-0.5*sigma*sigma) + rn*sigma*Math.sqrt(h);
      sum = sum + x;
      w.push(sum);
      this.data.push({date:i,close:sum});
    }
    console.log('data',this.data);
  }









 gaussian(mean, stdev) {
    var y2;
    var use_last = false;
    return function() {
        var y1;
        if(use_last) {
           y1 = y2;
           use_last = false;
        } else {
            var x1, x2, w;
            do {
                 x1 = 2.0 * Math.random() - 1.0;
                 x2 = 2.0 * Math.random() - 1.0;
                 w  = x1 * x1 + x2 * x2;               
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
       }

       var retval = mean + stdev * y1;
       if(retval > 0) {
          return retval;
       } else {
         return -retval;
       }
           
   };
}





  rerun() {
    this.genseries();
    console.log(this.data);
    console.log('functions and constants');
    console.log(math.round(math.e, 3));           // 2.718
    console.log('rn',this.gaussian(0,1)());           // 2.718


  }









}
