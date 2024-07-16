import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { aggregateData } from 'helper/agrigatedData'; // Adjust the import path as needed


const GroupedColumnChart = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [period, setPeriod] = useState('day');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (!data) return;

    const aggregated = aggregateData(data, period);
    setFilteredData(aggregated);

    // Set the year to display in the top right corner
    if (data.length > 0) {
      const parsedDate = d3.timeParse('%Y-%m-%d')(data[0].date);
      const formattedYear = d3.timeFormat('%Y')(parsedDate);
      setYear(formattedYear);
    }
  }, [data, period]);

  useEffect(() => {
    if (!filteredData.length) return;

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const containerWidth = document.getElementById('chart-container').clientWidth;
    const width = containerWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select('#multi-chart').selectAll('*').remove();

    const svg = d3
      .select('#multi-chart')
      .append('svg')
      .attr('width', containerWidth)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.date))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.totalAmount)])
      .nice()
      .range([height, 0]);

    svg
      .selectAll('.bar')
      .data(filteredData)
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

    // Add Y axis with custom tick format
    svg.append('g')
      .call(d3.axisLeft(yScale).tickFormat(d3.format(".2s")));

    // Add year label to the top right corner
    svg.append('text')
      .attr('x', width)
      .attr('y', -10)
      .attr('text-anchor', 'end')
      .style('font-size', '14px')
      .style('fill', '#333')
      .text(year);

    // Make the SVG responsive
    const resizeObserver = new ResizeObserver(() => {
      const newContainerWidth = document.getElementById('chart-container').clientWidth;
      const newWidth = newContainerWidth - margin.left - margin.right;
      svg.attr('width', newContainerWidth);
      xScale.range([0, newWidth]);

      svg.selectAll('.bar')
        .attr('x', (d) => xScale(d.date))
        .attr('width', xScale.bandwidth());

      svg.select('.x-axis').call(d3.axisBottom(xScale));
    });

    resizeObserver.observe(document.getElementById('chart-container'));

    return () => resizeObserver.disconnect();
  }, [filteredData, year]);

  return (
    <div>
      <div>
        <label>
          <input type="radio" value="day" checked={period === 'day'} onChange={() => setPeriod('day')} />
          Day
        </label>
        <label>
          <input type="radio" value="month" checked={period === 'month'} onChange={() => setPeriod('month')} />
          Month
        </label>
        <label>
          <input type="radio" value="year" checked={period === 'year'} onChange={() => setPeriod('year')} />
          Year
        </label>
      </div>
      <div id="chart-container" style={{ width: '100%' }}>
        <div id="multi-chart"></div>
      </div>
    </div>
  );
};

export default GroupedColumnChart;
