import { Component, OnInit, Input, OnChanges, SimpleChange  } from '@angular/core';

@Component({
    selector: 'app-plotfunction',
    template: `
    <h5>Function Plottter</h5>
      <div id="plotscreen"></div>
  `
})

export class PlotfunctionComponent implements OnInit {

    @Input() values: any;
    @Input() usedates: number;

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        let log: string[] = [];
        this. update();
        console.log('changes',changes);
        // for (let propName in changes) {
        //     console.log('changes',changes);
        // // let changedProp = changes[propName];
        // // let from = JSON.stringify(changedProp.previousValue);
        // // let to =   JSON.stringify(changedProp.currentValue);
        // // log.push( `${propName} changed from ${from} to ${to}`);
        // }
    }


    update() {
        d3.select("#plotscreen").selectAll("*").remove();

        var margin = { top: 30, right: 20, bottom: 30, left: 50 },
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;

        // Parse the date / time
        var parseDate = d3.time.format("%d-%b-%y").parse;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes
        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

        // Define the line
        var valueline = d3.svg.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.close); });

        // Adds the svg canvas
        var svg = d3.select("#plotscreen")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");





        var data = this.values;
            // data.forEach(function (d) {
            //     d.date = parseDate(d.date);
            //     d.close = +d.close;
            // });

            // Scale the range of the data
            //x.domain(d3.extent(data, function (d) { return d.date; }));



            x.domain([0, d3.max(data, function (d) { return d.date; })]);
            y.domain([0, d3.max(data, function (d) { return d.close; })]);

            // Add the valueline path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data));

            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);
    }


    initgraph() {
        var margin = { top: 30, right: 20, bottom: 30, left: 50 },
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;

        // Parse the date / time
        var parseDate = d3.time.format("%d-%b-%y").parse;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes
        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

        // Define the line
        var valueline = d3.svg.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.close); });

        // Adds the svg canvas
        var svg = d3.select("#plotscreen")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    }





    ngOnInit() {
         this.initgraph();
         this.update(); 
        // var data = [{date:'1-May-12',close:58.13}, {date:'30-Apr-12',close:53.98}];

//        });

        // Get the data
        // d3.csv("../../dependencies/data.csv", function (error, data) {
        //     data.forEach(function (d) {
        //         d.date = parseDate(d.date);
        //         d.close = +d.close;
        //     });

        //     // Scale the range of the data
        //     x.domain(d3.extent(data, function (d) { return d.date; }));
        //     y.domain([0, d3.max(data, function (d) { return d.close; })]);

        //     // Add the valueline path.
        //     svg.append("path")
        //         .attr("class", "line")
        //         .attr("d", valueline(data));

        //     // Add the X Axis
        //     svg.append("g")
        //         .attr("class", "x axis")
        //         .attr("transform", "translate(0," + height + ")")
        //         .call(xAxis);

        //     // Add the Y Axis
        //     svg.append("g")
        //         .attr("class", "y axis")
        //         .call(yAxis);

        // });
    }


    }
