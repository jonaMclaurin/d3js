import * as d3 from "d3";

function nodesTree() {
  var data = {
    name: "A1",
    children: [
      {
        name: "B1",
        children: [
          {
            name: "C1",
            value: 100
          },
          {
            name: "C2",
            value: 300
          },
          {
            name: "C3",
            value: 200
          }
        ]
      },
      {
        name: "B2",
        value: 200
      }
    ]
  };

  var treeLayout = d3.tree().size([400, 200]);

  var root = d3.hierarchy(data);

  var tree = treeLayout(root);
  console.log({ tree });

  d3.select("svg g.nodes")
    .selectAll("circle.node")
    .data(root.descendants())
    .enter()
    .append("circle")
    .classed("node", true)
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    })
    .attr("r", 4);

  // Links
  d3.select("svg g.links")
    .selectAll("line.link")
    .data(root.links())
    .enter()
    .append("line")
    .classed("link", true)
    .attr("x1", function (d) {
      return d.source.x;
    })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });
}

export default nodesTree;
