import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { max as d3Max, min as d3Min } from "d3-array";

const BarChart = ({ data, title }) => {
  const chartWidth = 102;
  const chartHeight = 44;
  const min = d3Min(data);
  const max = d3Max(data);
  const minDomain = min > 0 ? 0 : min;
  const maxDomain = max < 0 ? 0 : max;
  const yScale = scaleLinear().domain([minDomain, maxDomain]).range([chartHeight, 0]);
  const origin = yScale(0);
  const rects = [];
  const size = data.length;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < size; i++) {
    const chartRectX = (i * chartWidth) / size;
    const chartRectWidth = chartWidth / size - 3;
    const chartRectY = yScale(data[i]);
    const chartRectHeight = Math.abs(origin - chartRectY);

    rects.push(
      <rect
        key={i}
        fill={data[i] === max ? "#F6C90B" : "#C5CCD0"}
        x={chartRectX}
        y={d3Min([origin, chartRectY])}
        width={chartRectWidth}
        height={chartRectHeight}
      />
    );
  }

  return (
    <svg height="44" width="100" title={title}>
      <g transform="translate(0,0)" fill="transparent">
        {rects.map((rect) => rect)}
      </g>
    </svg>
  );
};

BarChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default BarChart;
