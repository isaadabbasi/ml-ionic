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
  
  area;
  chartType: 'revenue' | 'profit' = 'revenue';
  continentColor;
  data: any[];
  dimentions;
  svg;
  x; xAxisGroup; 
  y; yAxisGroup;
  yearLabel;
  constructor() { }

  ngOnInit() {
    //imports the data from json/csv format keep in global scope before drawing chart  
    let data = require('./data.json');
    this.data = data.map(con => con.countries.filter(data => data.income && data.life_exp)
      .map(data => ({...data, income: Number(data.income), life_exp: Number(data.life_exp)}) ))
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
    this.svg = d3.select("#scatter-plot")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
    // adding groups helps adding transitions and transformation to entire group easily rather than indivual element
        .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    // X Label: HTML <text x="width / 2" y="height + 40" font-size="18px" text-anchor="middle">.</text>
    this.svg.append("text")
        .attr("y", height + 40)
        .attr("x", width / 2)
        .attr("font-size", "18px")
        .attr("text-anchor", "middle")
        .text("GDP/Capita");

    // Y Label: HTML <text x="-(height/2)" y="-30" font-size="18px" transform="rotate(-90)" text-anchor="middle">.</text>
    this.svg.append("text")
        .attr("y", -30)
        .attr("x", -(height / 2))
        .attr("font-size", "18px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Life Expectancy (Years)");

    // Additional Label on Plot to show year-readings
    this.yearLabel = this.svg.append("text")
      .attr("y", height -10)
      .attr("x", width - 40)
      .attr("font-size", "32px")
      .attr("opacity", "0.3")
      .attr("text-anchor", "middle")
      .text("1800");

    // X Scale
    // ScaleBand, Discrete Input (domain) - Continous Output (Range)
    // It takes finite range of values and break into very small continous values
    this.x = d3.scaleLog()
      .base(10)
      .range([0, width])
      .domain([142, 150000]);

    // Y Scale,  
    // scaleLinear, scales the data in linearWay, consider it value-pixel ratio. 
    // It takes an input (domain) set of values (min, max) and output(range) set of values min-max.
    this.y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 90]);

    
    this.area = d3.scaleLinear()
      .range([25*Math.PI, 1500*Math.PI])
      .domain([2000, 1400000000]);

    // Continent color should be different to distinguish. schemePastel1 is color scheme.
    this.continentColor = d3.scaleOrdinal(d3.schemePastel1);
    
    // X Axis: 
    const xAxisCall = d3.axisBottom(this.x)
      .tickValues([400, 4000, 40000])
      .tickFormat(d3.format("$"));

    this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height +")")
      .call(xAxisCall); //.call() draws the axis on page/svg taking in the range provided as (x/y)AxisCall

    const yAxisCall = d3.axisLeft(this.y);
      // .tickFormat(d => Number(d));
    
    this.yAxisGroup = this.svg.append("g")
      .attr("class", "y axis")
      .call(yAxisCall);

    // this.updateChart(this.data);

    let index=0;
    d3.interval(() => {
      index = index<this.data.length-1 ? index+1 : 0;
      this.updateChart(this.data[index], index+1800);
    }, 100)
    this.updateChart(this.data[0], index+1800);
  }

  updateChart(data, year) {
    const t100 = d3.transition().duration(100);

    // Country circles
    const circles = this.svg.selectAll("circle")
      .data(data, d => d.country);

    //removes the unnecessary data on arrival of new data.
    circles.exit().remove()

    // circles.enter denotes the point when data is available in data array but not rendered on the page.
    circles.enter()
      .append("circle")
      .attr('fill', d => this.continentColor(d.continent))
      .merge(circles)
      .transition(t100)
        .attr("cx", d => this.x(+ d.income))
        .attr("cy", d => this.y(+ d.life_exp))
        .attr('r', d => Math.sqrt(this.area(d.population) / Math.PI) );

    this.yearLabel.text(year)
  }
}
