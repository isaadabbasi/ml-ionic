import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


interface Revenue {
  "month": string,
  "revenue": string | number,
  "profit": string | number
}
@Component({
  selector: 'app-start-barchart',
  templateUrl: './start-barchart.component.html',
  styleUrls: ['./start-barchart.component.scss']
})
export class StartBarchartComponent implements OnInit {
  
  chartType: 'revenue' | 'profit' = 'revenue';
  data: Revenue[];
  dimentions;
  label;
  svg; 
  x; xAxisGroup; 
  y; yAxisGroup;

  constructor() { }

  ngOnInit() {
    //imports the data from json/csv format keep in global scope before drawing chart  
    this.data = require('./revenues.json');
    this.drawBarChart();
  }

  drawBarChart() {

    // chart container alignment and spacing.
    const margin = { left:80, right:15, top:30, bottom:50 };

    this.dimentions = {
      width: 350 - margin.left - margin.right,
      height: 280 - margin.top - margin.bottom
    };

    const { width, height } = this.dimentions;
    //d3.select selectors works similar as JQuery's selector, supports #ele .ele <ele>, etc.
    this.svg = d3.select("#start-bar-chart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
    // adding groups helps adding transitions and transformation to entire group easily rather than indivual element
        .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    // X Label: HTML <text x="width / 2" y="height + 50" font-size="20px" text-anchor="middle">Month</text>
    this.svg.append("text")
        .attr("y", height + 50)
        .attr("x", width / 2)
        .attr("font-size", "18px")
        .attr("text-anchor", "middle")
        .text("Month");

    // Y Label: HTML <text x="-(height/2)" y="-60" font-size="20px" transform="rotate(90)" text-anchor="middle">Revenue</text>
    this.label = this.svg.append("text")
        .attr("y", -60)
        .attr("x", -(height / 2))
        .attr("font-size", "18px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)");


    // Clean data, as d3.max or d3.range wont work on strings but only numbers
    this.data = this.data.map(d => ({...d, profit: Number(d.profit), revenue: Number(d.revenue)}) );

    // X Scale
    // ScaleBand, Discrete Input (domain) - Continous Output (Range)
    // It takes finite range of values and break into very small continous values
    this.x = d3.scaleBand()
        // .domain(this.data.map(d => d.month)), 
        .range([0, width])
        .padding(0.2);

    // Y Scale,  
    // scaleLinear, scales the data in linearWay, consider it value-pixel ratio. 
    // It takes an input (domain) set of values (min, max) and output(range) set of values min-max.
    this.y = d3.scaleLinear()
        // .domain([0, d3.max(this.data, d => d.revenue])
        .range([height, 0]);

    // X Axis: scaleBand and generate
    this.xAxisGroup = this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height +")")

    this.yAxisGroup = this.svg.append("g")
        .attr("class", "y axis");

    this.updateChart(this.data)
  }

  updateChart(dataSnapshot) {
    const data = [...dataSnapshot];
    this.chartType = this.chartType === 'revenue' ? 'profit' : 'revenue';
    const t700 = d3.transition().duration(700);
        
    if(this.chartType === 'revenue') {
      data.splice(data.length-1, data.length);
      this.label.text("Revenue");
    } else 
      this.label.text('Profit');

    const { height } = this.dimentions;
    this.x.domain(data.map(d => d.month)); //respects the indexing of array
    this.y.domain([0, d3.max(data, d => d[this.chartType]],null);

    const xAxisCall = d3.axisBottom(this.x);
    this.xAxisGroup.transition(t700).call(xAxisCall);

    // Y Axis
    const yAxisCall = d3.axisLeft(this.y)
      .tickFormat(d => `$${d}`);

    this.yAxisGroup.transition(t700).call(yAxisCall);
    

    // Bars
    const rects = this.svg.selectAll("rect")
      .data(data, d => d.month);

    //removes the unnecessary data on arrival of new data.
    rects.exit()
      .transition(d3.transition().duration(300))
      .attr('fill', '#e8e8e8')
      .attr('y', this.y(0))
      .attr('height', 0)
      .remove();

    rects
      .transition(t700)
      .attr("y", d => this.y(d[this.chartType]))
      .attr("x", d => this.x(d.month))
      .attr("height", d => height - this.y(d[this.chartType]))
      .attr("width", this.x.bandwidth)

    // rects.enter denotes the point when data is available in data array but not rendered on the page.
    rects.enter()
      .append("rect")
      .attr('x', this.x(0))
      .attr('y', this.y(0))
      .attr('height', 0)
      .attr('width', 0)
      .attr("fill", "grey")
      .merge(rects)
      .transition(t700)
        .attr("x", d => this.x(d.month))
        .attr("y", d => this.y(d[this.chartType]))
        .attr("height", d => height - this.y(d[this.chartType]))
        .attr("width", this.x.bandwidth);
  }
}
