import {Routes, RouterModule} from "@angular/router";
import {AboutComponent} from "./about/components/about.component";
import {ModuleWithProviders} from "@angular/core";
import {OptionPricingComponent} from "./todo/components/optionpricing.component";
import {MarkovChainComponent} from "./todo/components/markovchain.component";
import {BinPricingComponent} from "./todo/components/binpricing.component";



const appRoutes: Routes = [
    {path: '', redirectTo: 'optionpricing', pathMatch: 'full'},
    {path: 'optionpricing', component: OptionPricingComponent, data: {title: 'Option Pricing'}},
    {path: 'markovchain', component: MarkovChainComponent, data: {title: 'Markov Chain MC'}},
    {path: 'bintree', component: BinPricingComponent, data: {title: 'BinPricingComponent'}}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
