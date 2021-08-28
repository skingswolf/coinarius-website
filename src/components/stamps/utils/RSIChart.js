/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { max as d3Max, min as d3Min } from "d3-array";
import { line as d3Line, area as d3Area } from "d3-shape";
import PropTypes from "prop-types";
import styled from "styled-components";

const SvgComponent = styled.svg`
  position: absolute;
  top: 0;
`;

const Chart = ({ data, title, chartHeight, chartWidth, strokeColour, strokeWidth, fillColour }) => {
  if (!data || !data.length) {
    return null;
  }

  const chartLineMargin = 1;
  const values = data.map((elem) => elem.value);

  const xScale = scaleTime()
    .domain([new Date(data[0].time), new Date(data[data.length - 1].time)])
    .range([chartLineMargin, chartWidth - chartLineMargin - 1]);

  const yScale = scaleLinear()
    .domain([d3Min(values), d3Max(values)])
    .range([chartHeight - chartLineMargin, chartLineMargin]);

  const path = d3Line()
    .x((elem) => xScale(new Date(elem.time)))
    .y((elem) => yScale(elem.value))(data);

  const areaPath = d3Area()
    .x((elem) => xScale(new Date(elem.time)))
    .y0(yScale(0))
    .y1((elem) => yScale(elem.value))(data);

  return (
    <SvgComponent height={chartHeight} width="100%" role="img" title={title}>
      <g transform="translate(0,0)" fill="transparent">
        <path stroke={strokeColour} strokeWidth={strokeWidth} d={path} />
        {fillColour ? <path d={areaPath} fill={fillColour} /> : null}
      </g>
    </SvgComponent>
  );
};

Chart.defaultProps = {
  chartHeight: 45,
  chartWidth: 102,
  strokeColour: "blue",
  strokeWidth: 1,
  fillColour: null
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  chartHeight: PropTypes.number,
  chartWidth: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeColour: PropTypes.string,
  fillColour: PropTypes.string
};

export default Chart;
