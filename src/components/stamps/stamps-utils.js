/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { max as d3Max, min as d3Min } from "d3-array";
import { line as d3Line, area as d3Area } from "d3-shape";
import PropTypes from "prop-types";
import styled from "styled-components";

const PercentValue = styled.span`
  position: absolute;
  width: 100%;
  top: 7px;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
`;

const DisplayWithPercent = ({ value }) => {
  const roundedValue = value.toPrecision(3);

  if (roundedValue > 0) {
    return <PercentValue className="value positive">+{Math.abs(roundedValue)}%</PercentValue>;
  }
  if (roundedValue < 0) {
    return <PercentValue className="value negative">-{Math.abs(roundedValue)}%</PercentValue>;
  }

  return <PercentValue className="value">{roundedValue}%</PercentValue>;
};

DisplayWithPercent.propTypes = {
  value: PropTypes.number.isRequired
};

const Chart = ({ data, title, chartHeight, chartWidth, strokeColour, strokeWidth, fillColour }) => {
  if (!data || !data.length) {
    return null;
  }

  const chartLineMargin = 1;
  console.log(data);
  const values = data.map((elem) => elem.value);
  console.log(values);

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
    <svg height={chartHeight} width="100%" role="img" title={title}>
      <g transform="translate(0,0)" fill="transparent">
        <path stroke={strokeColour} strokeWidth={strokeWidth} d={path} />
        {fillColour ? <path d={areaPath} fill={fillColour} /> : null}
      </g>
    </svg>
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

const NoData = () => <div className="no-data">No Data</div>;

export { DisplayWithPercent, Chart, NoData };
