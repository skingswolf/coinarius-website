/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { max as d3Max, min as d3Min } from "d3-array";
import { line as d3Line } from "d3-shape";
import PropTypes from "prop-types";
import styled from "styled-components";

import { synthPurple, synthDarkYellow } from "../../../colourScheme";

const SVGComponent = styled.svg`
  position: absolute;
  top: 0;
`;

const DoubleChart = ({
  data,
  otherData,
  title,
  chartHeight,
  chartWidth,
  strokeColour,
  strokeWidth
}) => {
  if (!data || !data.length) {
    return null;
  }

  const chartLineMargin = 1;

  // First element is time, second element is the data value itself.
  const values = data.map((elem) => elem[1]);
  const otherValues = otherData.map((elem) => elem[1]);
  const allValues = values.concat(otherValues);

  // Prerequisite: both datasets being plotted share the same time scale.
  const xScale = scaleTime()
    .domain([new Date(data[0][0]), new Date(data[data.length - 1][0])])
    .range([chartLineMargin, chartWidth - chartLineMargin - 1]);

  const yScale = scaleLinear()
    .domain([d3Min(allValues), d3Max(allValues)])
    .range([chartHeight - chartLineMargin, chartLineMargin]);

  const path = d3Line()
    .x((elem) => xScale(new Date(elem[0])))
    .y((elem) => yScale(elem[1]))(data);

  const otherPath = d3Line()
    .x((elem) => xScale(new Date(elem[0])))
    .y((elem) => yScale(elem[1]))(otherData);

  return (
    <SVGComponent height={chartHeight} width="100%" role="img" title={title}>
      <g transform="translate(0,0)" fill="transparent">
        <path stroke={strokeColour} strokeWidth={strokeWidth} d={path} />
        <path stroke={synthDarkYellow} strokeWidth={strokeWidth} d={otherPath} />
      </g>
    </SVGComponent>
  );
};

DoubleChart.defaultProps = {
  chartHeight: 54,
  chartWidth: 102,
  strokeColour: synthPurple,
  strokeWidth: 1
};

DoubleChart.propTypes = {
  data: PropTypes.array.isRequired,
  otherData: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  chartHeight: PropTypes.number,
  chartWidth: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeColour: PropTypes.string
};

export default DoubleChart;
