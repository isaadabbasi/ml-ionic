import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-svgplay',
  templateUrl: './svgplay.component.html',
  styleUrls: ['./svgplay.component.scss']
})
export class SvgplayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.addSelectionExampleCircles()
  }

  addSelectionExampleCircles() {
    const data = [20, 15, 25, 22, 30];

    const svg = d3.select('#selector').append('svg')
      .attr('width', 400)
      .attr('height', 100);

    const circles = svg.selectAll('circles')
      .data(data);

    circles.enter()
      .append('circle')
      .attr('cx', (d, i)=> (i*50 + d*2))
      .attr('cy', (d, i) => 50)
      .attr('r', (d, i)=> d)
      .attr('fill', (d, i)=> d<23 ? '#e8e8e8': '#777');
  }

}
