import React, { useEffect } from 'react';
import * as d3 from 'd3';

const GroupedColumnChart = ({ data }) => {
  useEffect(() => {
    if (!data) return; // Ensure data is available before proceeding

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 980 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select('#multi-chart').selectAll('*').remove();

    const svg = d3
      .select('#multi-chart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', height + margin.top + margin.bottom)
      .append('g')

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.date)) // Assuming data has a 'date' field
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.totalAmount)]) // Adjusted for totalAmount
      .nice()
      .range([height, 0]);

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.date))
      .attr('y', (d) => yScale(d.totalAmount))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.totalAmount))
      .attr('fill', '#1de9b6');

    // Add X axis
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));

    // Add Y axis
    svg.append('g').call(d3.axisLeft(yScale));
  }, [data]);

  return <div id="multi-chart"></div>;
};

export default GroupedColumnChart;
