import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MathAssignment } from "../models/mathassignment";
import { Option } from "../models/option";
import { BSPrice } from "../models/bsprice";
import { MonteCarlo } from "../models/montecarlo";
import { MathService } from '../services/math.service';
import { PlotfunctionComponent } from "./plotfunction.component";
import { TreegraphComponent } from "./treegraph.component";
import { HistogramComponent } from "./histogram.component";
import { BinominalTreeComponent } from "./binominaltree.component";


@Component({
  selector: 'app-binpricing',
  template: `

  <div class="container">
  <div class="form-group row">
    <label for="example-text-input" class="col-xs-2 col-form-label">Steps</label>
    <div class="col-xs-10">
    <input class="form-control" type="number" name="myDecimal" [(ngModel)]="N" placeholder="Decimal" step="1" />
    </div>
  </div>
  </div>

  <div class="container">
    <h2>Binominal Pricing Model (N={{N}})</h2>
    <input class="form-control" type="number" name="myDecimal" [(ngModel)]="S0" placeholder="Decimal" step="1" />
    <input class="form-control" type="number" name="myDecimal" [(ngModel)]="K" placeholder="Decimal" step="1" />
    <app-binominaltree [(N)]="N" [(S0)]="S0" [(K)]="K" [(up)]="up" [(down)]="down"></app-binominaltree>
  </div>
  `
})

export class BinPricingComponent {

 constructor(private router: Router, private mathservice: MathService) {
  }

 N:number;
 S0:number;
 K:number;
 up:number;
 down:number;

  ngOnInit() {
    this.N = 3;
    this.S0 = 100;
    this.K = 110;
    this.up = 1.1;
    this.down = 0.9;
  }

}

