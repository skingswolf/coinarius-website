/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { line as d3Line } from "d3-shape";
import PropTypes from "prop-types";
import styled from "styled-components";

const SVGComponent = styled.svg`
  position: absolute;
  top: 0;
`;

const DoubleChart = ({ data, title, chartHeight, chartWidth, strokeColour, strokeWidth }) => {
  if (!data || !data.length) {
    return null;
  }

  const chartLineMargin = 1;

  const lowerBoundaryData = data.map((elem) => [elem[0], 30]);
  const upperBoundaryData = data.map((elem) => [elem[0], 70]);

  const xScale = scaleTime()
    .domain([new Date(data[0][0]), new Date(data[data.length - 1][0])])
    .range([chartLineMargin, chartWidth - chartLineMargin - 1]);

  const yScale = scaleLinear()
    .domain([0, 100])
    .range([chartHeight - chartLineMargin, chartLineMargin]);

  const path = d3Line()
    .x((elem) => xScale(new Date(elem[0])))
    .y((elem) => yScale(elem[1]))(data);

  const lowerBoundaryPath = d3Line()
    .x((elem) => xScale(new Date(elem[0])))
    .y((elem) => yScale(elem[1]))(lowerBoundaryData);

  const upperBoundaryPath = d3Line()
    .x((elem) => xScale(new Date(elem[0])))
    .y((elem) => yScale(elem[1]))(upperBoundaryData);

  return (
    <SVGComponent height={chartHeight} width="100%" role="img" title={title}>
      <g transform="translate(0,0)" fill="transparent">
        <path stroke={strokeColour} strokeWidth={strokeWidth} d={path} />
        <path
          stroke="orange"
          strokeDasharray="3, 3"
          strokeWidth={strokeWidth}
          d={lowerBoundaryPath}
        />
        <path
          stroke="orange"
          strokeDasharray="3, 3"
          strokeWidth={strokeWidth}
          d={upperBoundaryPath}
        />
      </g>
    </SVGComponent>
  );
};

DoubleChart.defaultProps = {
  chartHeight: 54,
  chartWidth: 102,
  strokeColour: "blue",
  strokeWidth: 1
};

DoubleChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  chartHeight: PropTypes.number,
  chartWidth: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeColour: PropTypes.string
};

export default DoubleChart;
