import { Component, OnInit, Input, OnChanges, SimpleChange  } from '@angular/core';

@Component({
    selector: 'app-histogram',
    template: `
    <h5> {{title}} </h5>
    <div *ngIf="values.length > 0" id="histogram"></div>
    <div *ngIf="values.length < 1">
        <h5>No data for histogram</h5>
    </div>
  `,
   styles: [`
        body {
        font: 10px sans-serif;
        }

        .bar rect {
        shape-rendering: crispEdges;
        }

        .bar text {
        fill: #999999;
        }

        .axis path, .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
        }
    `]
})

export class HistogramComponent implements OnInit {

    // @Input() usedates: number;
    @Input() title: string;
    @Input() values: number[];


    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        let log: string[] = [];
        this.update();
        this.initgraph();
        console.log('changes in histogram',changes);
        // for (let propName in changes) {
        //     console.log('changes',changes);
        // // let changedProp = changes[propName];
        // // let from = JSON.stringify(changedProp.previousValue);
        // // let to =   JSON.stringify(changedProp.currentValue);
        // // log.push( `${propName} changed from ${from} to ${to}`);
        // }
    }


    update() {
        d3.select("#histogram").selectAll("*").remove();
    }


    initgraph() {
            var color = "steelblue";

            // Generate a 1000 data points using normal distribution with mean=20, deviation=5
            //var values = d3.range(1000).map(d3.random.normal(20, 5));

            // A formatter for counts.
            var formatCount = d3.format(",.0f");

            var w = 480;
            var h = 250;

            var margin = {top: 20, right: 30, bottom: 30, left: 30};
            var width = w - margin.left - margin.right;
            var height = h - margin.top - margin.bottom;

            var max = d3.max(this.values);
            var min = d3.min(this.values);
            var x = d3.scale.linear()
                .domain([min, max])
                .range([0, width]);

            // Generate a histogram using twenty uniformly-spaced bins.
            var data = d3.layout.histogram()
                .bins(x.ticks(20))
                (this.values);

            var yMax = d3.max(data, function(d) {return d.length;});
            var yMin = d3.min(data, function(d) {return d.length;});
            var colorScale = d3.scale.linear()
                .domain([yMin, yMax])
                .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

            var y = d3.scale.linear()
                .domain([0, yMax])
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var svg = d3.select("#histogram").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var bar = svg.selectAll(".bar")
                .data(data)
            .enter().append("g")
                .attr("class", "bar")
                .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

            bar.append("rect")
                .attr("x", 1)
                .attr("width", (x(data[0].dx) - x(0)) - 1)
                .attr("height", function(d) { return height - y(d.y); })
                .attr("fill", function(d) { return colorScale(d.y); });

            bar.append("text")
                .attr("dy", ".75em")
                .attr("y", -12)
                .attr("x", (x(data[0].dx) - x(0)) / 2)
                .attr("text-anchor", "middle")
                .text(function(d) { return formatCount(d.y); });

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
    }

    ngOnInit() {
         this.initgraph();
         //this.title = "Hello World!";
         //this.update();
    }


    }
