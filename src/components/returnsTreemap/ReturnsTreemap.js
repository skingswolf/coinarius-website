/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import _ from "lodash";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import React, { useEffect, useState, useLayoutEffect } from "react";
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
  maxPostDepth: 1,
  minHighlightColor: "#8c6bb1",
  midHighlightColor: "#9ebcda",
  maxHighlightColor: "#edf8fb",
  minColor: "#009688",
  midColor: "#f7f7f7",
  maxColor: "#ee8100",
  // headerHeight: 15,
  // height: 500,
  useWeightedAverageForAggregation: true,
  generateTooltip: (row, size, value) => {
    if (row === 0) {
      return "";
    }

    return `<div style="background:#fd9; padding:10px; border-style:solid"> row: ${row} size: ${size} val: ${value}</div>`;
  }
};

// Taken from Stackoverflow
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", _.debounce(updateSize, 100));
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return windowSize;
}

const ReturnsTreemap = ({
  analytics,
  heatmapClickHandler,
  horizontalPanePosition,
  verticalPanePosition
}) => {
  const clickhandler = () => {
    heatmapClickHandler("DOGE");
  };

  // Effect hook used to force a chart re-render on
  // changes to the horizontal and vertical panel positioning.
  // Approach taken from Stackoverflow
  const windowSize = useWindowSize();
  const [key, setkey] = useState(false);
  useEffect(() => {
    setkey((prevKey) => !prevKey);
  }, [horizontalPanePosition, verticalPanePosition, windowSize.width, windowSize.height]);
  const securities = Object.keys(analytics);

  const return30daySeries = securities.map((security) => {
    const { timeSeries } = analytics[security].return_30d;
    const return30day = parseFloat(timeSeries[timeSeries.length - 1][1]).toFixed(2);

    return [security, "Market", Math.abs(return30day), return30day];
  });

  return30daySeries.unshift(["Market", null, 0, 0]);
  return30daySeries.unshift(["Security", "Parent", "Abs, Return", "Return"]);
  // ]}
  return (
    <ChartContainer id="chart-container">
      <Chart
        key={key}
        width="100%"
        height="100%"
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
  heatmapClickHandler: PropTypes.func.isRequired,
  verticalPanePosition: PropTypes.string.isRequired,
  horizontalPanePosition: PropTypes.string.isRequired
};

export default ReturnsTreemap;
