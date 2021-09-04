/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-google-charts";
import MoonLoader from "react-spinners/MoonLoader";
import styled from "styled-components";

const loaderOverride = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ChartContainer = styled.div``;

const options = {
  highlightOnMouseOver: true,
  maxDepth: 1,
  maxPostDepth: 2,
  minHighlightColor: "#8c6bb1",
  midHighlightColor: "#9ebcda",
  maxHighlightColor: "#edf8fb",
  minColor: "#009688",
  midColor: "#f7f7f7",
  maxColor: "#ee8100",
  headerHeight: 15,
  showScale: true,
  height: 500,
  useWeightedAverageForAggregation: true,
  generateTooltip: (row, size, value) => {
    if (row === 0) {
      return null;
    }

    return `<div style="background:#fd9; padding:10px; border-style:solid"> row: ${row} size: ${size} val: ${value}</div>`;
  }
};

const ReturnsTreemap = ({ analytics, heatmapClickHandler }) => {
  const clickhandler = () => {
    heatmapClickHandler("DOGE");
  };

  const [size, setSize] = useState({
    width: "100%",
    height: "100%"
  });
  const chartContainerRef = useRef(null);

  useEffect(() => {
    setSize({
      width: `${chartContainerRef.current.clientHeight}px`,
      height: `${chartContainerRef.current.clientWidth}px`
    });
  }, [
    localStorage.getItem("splitHorizontalPosition"),
    localStorage.getItem("splitVerticalPosition")
  ]);

  const securities = Object.keys(analytics);

  const return30daySeries = securities.map((security) => {
    const { timeSeries } = analytics[security].return_30d;
    const return30day = parseFloat(timeSeries[timeSeries.length - 1][1]).toFixed(2);

    return [security, "Market", Math.abs(return30day), return30day];
  });

  return30daySeries.unshift(["Market", null, 0, 0]);
  return30daySeries.unshift(["Security", "Parent", "Abs, Return", "Return"]);

  // data={[
  //   ["Security", "Parent", "Abs, Return"],
  //   ["Market", null, 0],
  //   ["BTC", "Market", 170],
  //   ["ETH", "Market", 104],
  //   ["LTC", "Market", 102]
  // ]}
  return (
    <ChartContainer id="chart-container" ref={chartContainerRef}>
      <Chart
        width="975px"
        height="500px"
        chartType="TreeMap"
        data={return30daySeries}
        options={options}
        loader={
          <MoonLoader color="red" loading={analytics.isLoading} css={loaderOverride} size={150} />
        }
      />
    </ChartContainer>
  );
};

ReturnsTreemap.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  analytics: PropTypes.object.isRequired,
  heatmapClickHandler: PropTypes.func.isRequired
};

export default ReturnsTreemap;
