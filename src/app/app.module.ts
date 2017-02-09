import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {AboutComponent} from "./about/components/about.component";
import {OptionPricingComponent} from "./todo/components/optionpricing.component";
import {MarkovChainComponent} from "./todo/components/markovchain.component";
import {FormValidationComponent} from "./todo/components/formvalidation.component";
import {MathService} from "./todo/services/math.service";
import {HttpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlotfunctionComponent } from "./todo/components/plotfunction.component";
import { TreegraphComponent } from "./todo/components/treegraph.component";
import { HistogramComponent } from "./todo/components/histogram.component";
import { BinPricingComponent } from "./todo/components/binpricing.component";
import { BinominalTreeComponent } from "./todo/components/binominaltree.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        FormValidationComponent,
        OptionPricingComponent,
        MarkovChainComponent,
        AboutComponent,
        PlotfunctionComponent,
        TreegraphComponent,
        HistogramComponent,
        BinPricingComponent,
        BinominalTreeComponent
    ],
    providers: [
        appRoutingProviders,
        MathService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}