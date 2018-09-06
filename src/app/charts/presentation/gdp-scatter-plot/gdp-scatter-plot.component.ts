import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


interface Country {
  "continent": string,
  "country": string,
  "income": number,
  "life_exp": number,
  "population": number
}
interface GDPPerCapita {
  countries: Array<Country>,
  year: string | number
}

@Component({
  selector: 'gdp-scatter-plot',
  templateUrl: './gdp-scatter-plot.component.html',
  styleUrls: ['./gdp-scatter-plot.component.scss']
})

export class GdpScatterPlotComponent implements OnInit {

  chartType: 'revenue' | 'profit' = 'revenue';
  data: GDPPerCapita[];
  dimentions;
  svg;
  x; xAxisGroup; 
  y; yAxisGroup;
  constructor() { }

  async ngOnInit() {
    //imports the data from json/csv format keep in global scope before drawing chart  
    this.data = require('./data.json');
    console.log(this.data);

    this.drawBarChart();
  }

  drawBarChart() {

    // chart container alignment and spacing.
    const margin = { left:50, right:15, top:30, bottom:50 };

    this.dimentions = {
      width: 380 - margin.left - margin.right,
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
        .attr("y", height + 20)
        .attr("x", width / 2)
        .attr("font-size", "18px")
        .attr("text-anchor", "middle")
        .text("GDP/Capita");

    // Y Label: HTML <text x="-(height/2)" y="-60" font-size="20px" transform="rotate(90)" text-anchor="middle">Revenue</text>
    this.svg.append("text")
        .attr("y", -30)
        .attr("x", -(height / 2))
        .attr("font-size", "18px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Life Expectancy (Years)");


    // Clean data, as d3.max or d3.range wont work on strings but only numbers
    // this.data = this.data.map(d => ({...d, profit: Number(d.profit), revenue: Number(d.revenue)}) );

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

    this.updateChart(this.data);

    d3.interval(() => {
      console.log('hello');
      // this.updateChart(this.data);
    }, 5000)
  }

  updateChart(dataSnapshot) {
    const data = [...dataSnapshot];
    this.chartType = this.chartType === 'revenue' ? 'profit' : 'revenue';
    const t700 = d3.transition().duration(700);

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
    const circles = this.svg.selectAll("circle")
      .data(data, d => d.month);

    //removes the unnecessary data on arrival of new data.
    circles.exit()
      .transition(d3.transition().duration(300))
      .attr('fill', '#e8e8e8')
      .attr('cy', this.y(0))
      .remove();

    circles
      .transition(t700)
      .attr("cy", d => this.y(d[this.chartType]))
      .attr("cx", d => this.x(d.month))
      .attr('r', 4)
      .attr("width", this.x.bandwidth)

    // circles.enter denotes the point when data is available in data array but not rendered on the page.
    circles.enter()
      .append("circle")
      .attr('cx', this.x(0) )
      .attr('cy', this.y(0))
      .attr('r', 0)
      .attr('fill', 'grey')
      .merge(circles)
      .transition(t700)
        .attr("cx", d => this.x(d.month) + this.x.bandwidth()/2)
        .attr("cy", d => this.y(d[this.chartType]))
        .attr('r', 4)
  }
}
