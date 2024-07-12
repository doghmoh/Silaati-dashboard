import React, { useEffect } from 'react';
import * as d3 from 'd3';

const PieDonutChart2 = ({ data }) => {
  useEffect(() => {
    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.6;

    // Clear the previous SVG and legend
    d3.select('#donut-chart2').selectAll('*').remove();

    const svg = d3
      .select('#donut-chart2')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const colorScale = d3.scaleOrdinal().range(data.map(d => d.color));

    const pie = d3.pie().value((d) => d.y);

    const arc = d3.arc().outerRadius(radius).innerRadius(innerRadius);

    const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => colorScale(d.data.color))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')  // Adjust font size as needed
      .text((d) =>  d.data.y);

    // Create legend below the chart
    const legend = d3
      .select('#donut-chart2')
      .append('div')
      .attr('class', 'legend')
      .style('display', 'flex')
      .style('justify-content', 'space-between')
      .style('margin', '10px');

    legend.selectAll('.legend-item')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'legend-item')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('margin-bottom', '5px')
      .style('margin', '10px');

    legend.selectAll('.legend-item')
      .append('span')
      .style('width', '10px')
      .style('height', '10px')
      .style('background-color', (d) => colorScale(d.color))
      .style('margin-right', '5px');

    legend.selectAll('.legend-item')
      .append('span')
      .text((d) => d.key);

  }, [data]);

  return <div id="donut-chart2" className='d-flex flex-column justify-content-center align-items-center'></div>;
};

export default PieDonutChart2;
