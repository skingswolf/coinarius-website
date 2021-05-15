import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { scaleTime, scaleLinear } from "d3-scale";
import { max as d3Max, min as d3Min } from "d3-array";
import { line as d3Line, area as d3Area } from "d3-shape";
import themesNames from "../../styles/themesNames";
import { themeVariables } from "../../styles/variables-resolver";

const styles = themeVariables[themesNames.dark];

export const Types = {
  PriorityHome: "priority-home",
  Performance: "performance",
  Signals: "signals",
  Volume: "volume",
  Insiders: "insiders",
  Valuation: "valuation",
  ImpliedVol: "implied-vol",
  ShortInterest: "short-interest",
  CDS: "cds",
  Divergence: "divergence",
  StockHome: "stock-home",
  Jobs: "jobs",
  ESG: "esg",
  PressRelease: "press-release",
  EPSMomentum: "EPS-momentum",
  StockEvents: "stock-events",
  WatchlistEvents: "watchlist-events",
  Dividend: "dividend"
};

// Fix the whisker position to the max or in if the value is greater than the max or min value
const getWhiskerValue = (whiskerPosition, whiskerBarRangeMin, whiskerBarRangeMax) => {
  let value;

  if (Math.sign(whiskerPosition) === -1) {
    value = whiskerPosition < whiskerBarRangeMin ? whiskerBarRangeMin : whiskerPosition;
  } else {
    value = whiskerPosition > whiskerBarRangeMax ? whiskerBarRangeMax : whiskerPosition;
  }

  return value;
};

export const NoData = () => <div className="no-data">No Data</div>;

export const FilledStar = ({ className }) => {
  const classNames = className ? `fa fa-star ${className}` : "fa fa-star";
  return <span className={classNames}></span>;
};

export const EmptyStar = ({ className }) => {
  const classNames = className ? `fa fa-star-o ${className}` : "fa fa-star-o";
  return <span className={classNames}></span>;
};

export const calculateWhiskerPosition = (
  whiskerPosition,
  whiskerBarRangeMin,
  whiskerBarRangeMax
) => {
  const whiskerValue = getWhiskerValue(whiskerPosition, whiskerBarRangeMin, whiskerBarRangeMax);
  const barWidth = 80;
  const start = 18;
  const whiskerGap = 8.8;
  const absWhiskerPosition = whiskerGap * Math.abs(whiskerValue);
  const barWidthFromStart = barWidth + start;
  const center = barWidthFromStart / 2;

  if (whiskerValue === 0) {
    return { left: `${center}px` };
  } else if (Math.sign(whiskerValue) === -1) {
    return { left: `${center - absWhiskerPosition}px` };
  }

  return { left: `${center + absWhiskerPosition}px` };
};

export const DisplayWithPercent = ({ value }) => {
  if (value > 0) {
    return <span className="value positive">+{Math.abs(value)}%</span>;
  }
  if (value < 0) {
    return <span className="value negative">-{Math.abs(value)}%</span>;
  }

  return <span className="value">{value}%</span>;
};

export const calculateXRange = ({ sessionStart, sessionEnd }) => {
  const resolution = "minute";

  const startDate = dayjs(sessionStart);
  const endDate = dayjs(sessionEnd);

  return endDate.diff(startDate, resolution) + 1;
};

export const Chart = ({
  data,
  title,
  chartHeight,
  chartWidth,
  strokeColour,
  strokeWidth,
  fillColour = null
}) => {
  if (!data || !data.length) {
    return null;
  }

  const chartLineMargin = 1;
  const values = data.map((elem) => elem.value);

  const xScale = scaleTime()
      .domain([new Date(data[0].time), new Date(data[data.length - 1].time)])
      .range([chartLineMargin, chartWidth - chartLineMargin - 1]),
    yScale = scaleLinear()
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
  strokeColour: styles.colorBlue400,
  strokeWidth: 1
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  chartHeight: PropTypes.number,
  chartWidth: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeColour: PropTypes.string
};

export const BarChart = ({ data, title }) => {
  const chartWidth = 102;
  const chartHeight = 44;
  const chartYOffset = 39;
  const min = d3Min(data);
  const max = d3Max(data);
  const minDomain = min > 0 ? 0 : min;
  const maxDomain = max < 0 ? 0 : max;
  const yScale = scaleLinear().domain([minDomain, maxDomain]).range([chartHeight, 0]);
  const origin = yScale(0);
  const rects = [];
  const size = data.length;

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
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
