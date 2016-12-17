import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-treegraph',
  template: `
  <h5>Tree Grapgh</h5>
  <div id="screen"></div>
  `
})

export class TreegraphComponent {

  @Input() graph: any;
  // answer:Answer;

  ngOnInit() {

 
      var treeData = this.graph;

      var width = 1360,
          height = 500;

      var tree = d3.layout.tree().size([height, width - 360]);

       var diagonal = d3.svg.diagonal()
           .projection(function(d) { return [d.y, d.x]; });

      var svg = d3.select("#screen").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(40,0)");

  //      svg.selectAll("*").remove();

  var nodes = tree.nodes(treeData),
      links = tree.links(nodes);

  var link = svg.selectAll("path.link")
      .data(links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll("g.node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });//d.x

  node.append("circle")
      .attr("r", 4.5);

  node.append("text")
     .attr("dx", function(d) { return d.children ? -8 : 8; })
     .attr("dy", 3)
     .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
     .text(function(d) { return d.name; });

	var maxLength = 10;
	var separation = 20;
	var textX = 0;

  }

}
