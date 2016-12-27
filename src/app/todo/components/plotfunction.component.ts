import { Component, OnInit, Input, OnChanges, SimpleChange  } from '@angular/core';

@Component({
    selector: 'app-plotfunction',
    template: `
    <h5>{{title}}</h5>
    <div *ngIf="values.length > 0" id="plotscreen"></div>
    <div *ngIf="values.length < 1">
        <h5>No data to plot</h5>
    </div>
  `
})

export class PlotfunctionComponent implements OnInit {

    @Input() values: any;
    @Input() title: string;
    @Input() usedates: number;

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        let log: string[] = [];
        this.update();
        this.update();
        console.log('changes in plot',changes);
        // for (let propName in changes) {
        //     console.log('changes',changes);
        // // let changedProp = changes[propName];
        // // let from = JSON.stringify(changedProp.previousValue);
        // // let to =   JSON.stringify(changedProp.currentValue);
        // // log.push( `${propName} changed from ${from} to ${to}`);
        // }
    }


    update() {
        var data = this.values;
        d3.select("#plotscreen").selectAll("*").remove();
        
        var margin = { top: 30, right: 20, bottom: 30, left: 50 },
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;

        // Parse the date / time
        var parseDate = d3.time.format("%d-%b-%y").parse;

        var ymin = d3.min(data, function (d) { return d.close; });
        var ymax = d3.max(data, function (d) { return d.close; });

        var xmin = d3.min(data, function (d) { return d.date; });
        var xmax = d3.max(data, function (d) { return d.date; });


      //x.domain([0, d3.max(data, function (d) { return d.date; })]);
            //y.domain([0, d3.max(data, function (d) { return d.close; })]);

        console.log('values for plotting',this.values);

        // Set the ranges
        //var x = d3.time.scale()
        var x = d3.scale.linear()
            .domain([xmin, xmax])
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([ymin, ymax])
            .range([height, 0]);

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


   // now add titles to the axes
        var padding = 50; 
        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Stock price S");

        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")")  // centre below axis
            .text("Time");
    }

    ngOnInit() {
         this.update(); 
    }


    }
