import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
    selector: 'app-binominaltree',
    template: `
    <h2>Price Evolution</h2>
    <div id="binominaltree"></div>
    <h2>Payoff</h2>
    <div id="payofftree"></div>
    <h2>Backpropagation tree</h2>

  `
})

export class BinominalTreeComponent implements OnInit {

    @Input() N: number;
    @Input() S0: number;
    @Input() K: number;
    @Input() up: number;
    @Input() down: number;

    ngOnInit() {
        this.update();
        this.payoff();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        // let log: string[] = [];
        this.update();
        this.payoff();

        // this.data = [];
        // for (var j = 0; j < this.values.length; j++) {
        //     this.data.push(this.values[j].close);
        // }
        // this.datalength = this.values.length;
        // for (let propName in changes) {
        //     console.log('changes',changes);
        // // let changedProp = changes[propName];
        // // let from = JSON.stringify(changedProp.previousValue);
        // // let to =   JSON.stringify(changedProp.currentValue);
        // // log.push( `${propName} changed from ${from} to ${to}`);
        // }
    }


    update() {
        d3.select("#binominaltree").selectAll("*").remove();
        var N = this.N;
        var S0 = this.S0;
        var vOffset = 50;
        var hOffset = 100;
        var rootXoffset = 30;
        var rootYoffset = 50 * N;
        var width = rootXoffset + hOffset * N;
        var height = rootYoffset + vOffset * N + 30;
        var rectWidth = 60;
        var rectHeight = 30;

        var svg = d3.select("#binominaltree")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        var i, j;
        var textbox;
        var startX;
        var startY;
        var targetX;
        var targetY;

        // first draw lines
        for (i = 0; i < N; i++) {
            for (j = 0; j < i + 1; j++) {
                if (j === 0) {
                    startX = rootXoffset + hOffset * i + rectWidth / 2;
                    startY = rootYoffset - vOffset * i + rectHeight / 2;
                    svg.append("line")
                        .attr("x1", startX)
                        .attr("y1", startY)
                        .attr("x2", startX + hOffset * (N - i - 1))
                        .attr("y2", startY + vOffset * (N - i - 1))
                        .attr("stroke-width", 1)
                        .attr("stroke", "black");
                }
                if (j === i) {
                    startX = rootXoffset + hOffset * i + rectWidth / 2;
                    startY = rootYoffset + vOffset * i + rectHeight / 2;
                    svg.append("line")
                        .attr("x1", startX)
                        .attr("y1", startY)
                        .attr("x2", startX + hOffset * (N - i - 1))
                        .attr("y2", startY - vOffset * (N - i - 1))
                        .attr("stroke-width", 1)
                        .attr("stroke", "black");
                };
            }
        }

        // ...than arrows and link labels...
        for (i = 0; i < N - 1; i++) {
            for (j = 0; j < i + 1; j++) {
                targetX = rootXoffset + hOffset * i + hOffset;
                targetY = rootYoffset - vOffset * i + (2 * vOffset) * j - vOffset + rectHeight;
                svg.append("line")
                    .attr("x1", targetX)
                    .attr("y1", targetY)
                    .attr("x2", targetX - 9)
                    .attr("y2", targetY + 3)
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                svg.append("line")
                    .attr("x1", targetX)
                    .attr("y1", targetY)
                    .attr("x2", targetX - 8)
                    .attr("y2", targetY + 6)
                    .attr("stroke-width", 1)
                    .attr("stroke", "black");
                textbox = svg.append("text")
                    .attr("x", targetX - 20)
                    .attr("y", targetY + 4)
                    .style("text-anchor", "end")
                    .style("font-size", "12px")
                    .text("p");
                targetY = rootYoffset - vOffset * i + (2 * vOffset) * j + vOffset;
                svg.append("line")
                    .attr("x1", targetX)
                    .attr("y1", targetY)
                    .attr("x2", targetX - 9)
                    .attr("y2", targetY - 3)
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                svg.append("line")
                    .attr("x1", targetX)
                    .attr("y1", targetY)
                    .attr("x2", targetX - 8)
                    .attr("y2", targetY - 6)
                    .attr("stroke-width", 1)
                    .attr("stroke", "black");
                textbox = svg.append("text")
                    .attr("x", targetX - 20)
                    .attr("y", targetY + 2)
                    .style("text-anchor", "end")
                    .style("font-size", "12px")
                    .text("1-p");
            }
        }

        // ... and rectangles and their labels
        for (i = 0; i < N; i++) {
            for (j = 0; j < i + 1; j++) {

                var price = Math.round(Math.pow(this.up, i - j) * Math.pow(this.down, j) * this.S0);
                var strike = this.K;


                var color = "blue";
                if (price - strike <= 0) {
                    color = "red";
                } else {
                    color = "green";
                }


                svg.append("rect")
                    .attr("x", rootXoffset + hOffset * i)
                    .attr("y", rootYoffset - vOffset * i + (2 * vOffset) * j)
                    .attr("width", 60)
                    .attr("height", 30)
                    .attr("ry", 5)
                    .style("stroke", "#787878")
                    // .style("fill", "beige");
                    .style("fill", color);

            textbox = svg.append("text")
                .attr("x", rootXoffset + hOffset * i)
                .attr("y", rootYoffset - vOffset * i + (2 * vOffset) * j)
                .attr("dx", 30)
                .attr("dy", 20)
                .style("text-anchor", "middle")
                .style("font-size", "15px");
            textbox.append("tspan")
                .text(price);


            // if ((i === 0) && (j === 0)) {
            //     textbox.append("tspan")
            //         .text("S");
            //     textbox.append("tspan")
            //         .attr("dy", 3)
            //         .style("font-size", "10px")
            //         .text("0");
            // } else if (j === 0) {
            //     if (i === 1) {
            //         textbox.append("tspan")
            //             .text("u.S");
            //     } else {
            //         textbox.append("tspan")
            //             .text("u");
            //         textbox.append("tspan")
            //             .attr("dy", -5)
            //             .style("font-size", "10px")
            //             .text(i);
            //         textbox.append("tspan")
            //             .attr("dy", 5)
            //             .text(".S");
            //     };
            //     textbox.append("tspan")
            //         .attr("dy", 3)
            //         .style("font-size", "10px")
            //         .text("0");
            // } else if (j === i) {
            //     if (i === 1) {
            //         textbox.append("tspan")
            //             .text("d.S");
            //     } else {
            //         textbox.append("tspan")
            //             .text("d");
            //         textbox.append("tspan")
            //             .attr("dy", -5)
            //             .style("font-size", "10px")
            //             .text(i);
            //         textbox.append("tspan")
            //             .attr("dy", 5)
            //             .text(".S");
            //     };
            //     textbox.append("tspan")
            //         .attr("dy", 3)
            //         .style("font-size", "10px")
            //         .text("0");
            // } else {
            //     if ((i === 2) && (j === 1)) {
            //         textbox.append("tspan")
            //             .text("ud.S");
            //     } else if (j === 1) {
            //         textbox.append("tspan")
            //             .text("ud");
            //         textbox.append("tspan")
            //             .attr("dy", -5)
            //             .style("font-size", "10px")
            //             .text(i - j);
            //         textbox.append("tspan")
            //             .attr("dy", 5)
            //             .text(".S");
            //     } else if (i === j + 1) {
            //         textbox.append("tspan")
            //             .text("u");
            //         textbox.append("tspan")
            //             .attr("dy", -5)
            //             .style("font-size", "10px")
            //             .text(j);
            //         textbox.append("tspan")
            //             .attr("dy", 5)
            //             .text("d.S");
            //     } else {
            //         textbox.append("tspan")
            //             .text("u");
            //         textbox.append("tspan")
            //             .attr("dy", -5)
            //             .style("font-size", "10px")
            //             .text(j);
            //         textbox.append("tspan")
            //             .attr("dy", 5)
            //             .text("d");
            //         textbox.append("tspan")
            //             .attr("dy", -5)
            //             .style("font-size", "10px")
            //             .text(i - j);
            //         textbox.append("tspan")
            //             .attr("dy", 5)
            //             .text(".S");
            //         textbox.append("tspan")
            //             .attr("dy", 3)
            //             .style("font-size", "10px")
            //             //.text("0");
            //             .text(price);

            //     }
        }
    }
}

    payoff() {
        d3.select("#payofftree").selectAll("*").remove();
        var N = this.N;
        var S0 = this.S0;
        var vOffset = 50;
        var hOffset = 100;
        var rootXoffset = 30;
        var rootYoffset = 50 * N;
        var width = rootXoffset + hOffset * N;
        var height = rootYoffset + vOffset * N + 30;
        var rectWidth = 60;
        var rectHeight = 30;

        var svg = d3.select("#payofftree")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        var i, j;
        var textbox;
        var startX;
        var startY;
        var targetX;
        var targetY;

        // first draw lines
        for (i = 0; i < N; i++) {
            for (j = 0; j < i + 1; j++) {
                if (j === 0) {
                    startX = rootXoffset + hOffset * i + rectWidth / 2;
                    startY = rootYoffset - vOffset * i + rectHeight / 2;
                    svg.append("line")
                        .attr("x1", startX)
                        .attr("y1", startY)
                        .attr("x2", startX + hOffset * (N - i - 1))
                        .attr("y2", startY + vOffset * (N - i - 1))
                        .attr("stroke-width", 1)
                        .attr("stroke", "black");
                }
                if (j === i) {
                    startX = rootXoffset + hOffset * i + rectWidth / 2;
                    startY = rootYoffset + vOffset * i + rectHeight / 2;
                    svg.append("line")
                        .attr("x1", startX)
                        .attr("y1", startY)
                        .attr("x2", startX + hOffset * (N - i - 1))
                        .attr("y2", startY - vOffset * (N - i - 1))
                        .attr("stroke-width", 1)
                        .attr("stroke", "black");
                };
            }
        }

        // ...than arrows and link labels...
        for (i = 0; i < N - 1; i++) {
            for (j = 0; j < i + 1; j++) {
                targetX = rootXoffset + hOffset * i + hOffset;
                targetY = rootYoffset - vOffset * i + (2 * vOffset) * j - vOffset + rectHeight;
                svg.append("line")
                    .attr("x1", targetX)
                    .attr("y1", targetY)
                    .attr("x2", targetX - 9)
                    .attr("y2", targetY + 3)
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                svg.append("line")
                    .attr("x1", targetX)
                    .attr("y1", targetY)
                    .attr("x2", targetX - 8)
                    .attr("y2", targetY + 6)
                    .attr("stroke-width", 1)
                    .attr("stroke", "black");
                textbox = svg.append("text")
                    .attr("x", targetX - 20)
                    .attr("y", targetY + 4)
                    .style("text-anchor", "end")
                    .style("font-size", "12px")
                    .text("p");
                targetY = rootYoffset - vOffset * i + (2 * vOffset) * j + vOffset;
                svg.append("line")
                    .attr("x1", targetX)
                    .attr("y1", targetY)
                    .attr("x2", targetX - 9)
                    .attr("y2", targetY - 3)
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                svg.append("line")
                    .attr("x1", targetX)
                    .attr("y1", targetY)
                    .attr("x2", targetX - 8)
                    .attr("y2", targetY - 6)
                    .attr("stroke-width", 1)
                    .attr("stroke", "black");
                textbox = svg.append("text")
                    .attr("x", targetX - 20)
                    .attr("y", targetY + 2)
                    .style("text-anchor", "end")
                    .style("font-size", "12px")
                    .text("1-p");
            }
        }



        var last_prices = [];
        for (i = 0; i < N; i++) {
            last_prices = [];
            for (j = 0; j < i + 1; j++) {
                var tmp_price = Math.round(Math.pow(this.up, i - j) * Math.pow(this.down, j) * this.S0);
                //console.log(i,j,tmp_price);
                last_prices.push(tmp_price);
            }
        }

        // console.log(last_prices);

        var n = this.N+1;
        
        for (j = 0;j<n;j ++) {
        	var jj = n-j;
            for (i = 0; i<jj-1; i++) {
            	// System.out.println("-----"+i);
            	//System.out.println(x[i]);
            	//System.out.println(x[i+1]);
            	last_prices[i] = last_prices[i] + last_prices[i+1];
            }
        }

        console.log('last_prices',last_prices);

        // ... and rectangles and their labels
        for (i = 0; i < N; i++) {
            for (j = 0; j < i + 1; j++) {

                var price = Math.round(Math.pow(this.up, i - j) * Math.pow(this.down, j) * this.S0);
                var strike = this.K;

                price = price - strike;


                var color = "blue";
                if (price <= 0) {
                    color = "red";
                    price = 0;
                } else {
                    color = "green";
                }


                svg.append("rect")
                    .attr("x", rootXoffset + hOffset * i)
                    .attr("y", rootYoffset - vOffset * i + (2 * vOffset) * j)
                    .attr("width", 60)
                    .attr("height", 30)
                    .attr("ry", 5)
                    .style("stroke", "#787878")
                    // .style("fill", "beige");
                    .style("fill", color);

            textbox = svg.append("text")
                .attr("x", rootXoffset + hOffset * i)
                .attr("y", rootYoffset - vOffset * i + (2 * vOffset) * j)
                .attr("dx", 30)
                .attr("dy", 20)
                .style("text-anchor", "middle")
                .style("font-size", "15px");
            textbox.append("tspan")
                .text(price);

        }
    }
}







    }


