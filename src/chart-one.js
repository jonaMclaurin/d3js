import * as d3 from "d3";

function chartOne() {
  let dataset = generateRandomData(10);
  let width = 500;
  let heigth = 300;
  let barPadding = 1;

  var svg = d3.select("#svg1").attr("width", width).attr("height", heigth);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return i * (width / dataset.length);
    })
    .attr("y", function (d) {
      return heigth - d * 4;
    })
    .attr("width", width / dataset.length - barPadding)
    .attr("height", function (d, i) {
      return d * 4;
    })
    .attr("fill", "gray");

  svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
      return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", function (d, i) {
      return (
        i * (width / dataset.length) + (width / dataset.length - barPadding) / 2
      );
    })
    .attr("y", function (d) {
      return heigth - d * 4 - 2;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "black");
}

function generateRandomData(numPoints) {
  let dataList = [];
  for (let i = 0; i < numPoints; i++) {
    let num = Math.ceil(Math.random() * 50);
    dataList.push(num);
  }
  return dataList;
}

export default chartOne;
