import * as d3 from "d3";
import data from "../my_weather_data.json";

//DATA
const dataSet = data;
//ACCESSORS
const xAccesor = (d) => d.dewPoint;
const yAccesor = (d) => d.humidity;
//DIMENSIONS
const width = d3.min([window.innerWidth * 0.9, window.innerHeight * 0.9]);

function Dimensions(width, height) {
  this.width = width;
  this.height = height;
  this.margin = {
    top: 10,
    right: 10,
    bottom: 50,
    left: 50
  };
  this.boundedWidth = this.width - this.margin.left - this.margin.right;
  this.boundedHeigth = this.height - this.margin.top - this.margin.bottom;
}

const dimensions = new Dimensions(width, width);

const wrapper = d3
  .select("#app")
  .append("svg")
  .attr("width", dimensions.width)
  .attr("height", dimensions.height);

const bounds = wrapper.append("g").style(
  "transform",
  `translate(
      ${dimensions.margin.left}px,
      ${dimensions.margin.top}px
    )`
);

//SCALES

const xScale = d3
  .scaleLinear()
  .domain(d3.extent(dataSet, xAccesor))
  .range([0, dimensions.boundedWidth])
  .nice();

const yScale = d3
  .scaleLinear()
  .domain(d3.extent(dataSet, yAccesor))
  .range([dimensions.boundedHeigth, 0])
  .nice();

//DRAW DATA

function drawDots(data, color) {
  const dots = bounds.selectAll("circle").data(data);
  dots
    .enter()
    .append("circle")
    .merge(dots)
    .attr("cx", (d) => xScale(xAccesor(d)))
    .attr("cy", (d) => yScale(yAccesor(d)))
    .attr("r", 5)
    .attr("fill", color);

  //   ===>  X-AXIS  <===
  const xAxisGenerator = d3.axisBottom().scale(xScale);

  const xAxis = bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${dimensions.boundedHeigth}px)`);

  //X axis label
  const xAxisLabel = xAxis
    .append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .attr("font-size", "1.4em")
    .html("Dew point (&deg;F)");

  //   ===>  Y-AXIS  <===
  const yaxisGenerator = d3.axisLeft().scale(yScale).ticks(4);

  const yAxis = bounds.append("g").call(yaxisGenerator);

  //Y axis label
  const yAxisLabel = yAxis
    .append("text")
    .attr("x", -dimensions.boundedWidth / 2)
    .attr("y", -dimensions.margin.left + 10)
    .attr("fill", "black")
    .attr("font-size", "1.4em")
    .html("Relative humidity")
    .style("transform", "rotate(-90deg)")
    .style("text-anchor", "middle");
}

drawDots(dataSet, "cornflowerblue");

console.log(d3.merge([[1], [2, 3, 4], [5]]));
