/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import _ from "lodash";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import React, { useEffect, useState, useLayoutEffect } from "react";
import Chart from "react-google-charts";
import BounceLoader from "react-spinners/BounceLoader";
import styled from "styled-components";
import {
  synthLightRedOne,
  synthLightRedTwo,
  synthRedInBetween,
  synthLightGreenOne,
  synthLightGreenTwo,
  synthGreenInBetween,
  lightestGreyColour,
  synthPurple
} from "../../colourScheme";

const loaderOverride = css`
  display: block;
`;
const SpinnerLoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartContainer = styled.div``;

const options = {
  highlightOnMouseOver: true,
  minHighlightColor: "#f7f7f7",
  midHighlightColor: "#f7f7f7",
  maxHighlightColor: "#f7f7f7",
  minColor: "#f7f7f7",
  midColor: "#f7f7f7",
  maxColor: "#f7f7f7",
  headerColor: `${lightestGreyColour}`,
  useWeightedAverageForAggregation: true,
  fontSize: 15,
  eventsConfig: {
    drilldown: [], // Disable drilldowns.
    highlight: ["click"]
  }
};

// Taken from Stackoverflow
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Debounce the resize event handler to avoid excessive chart redraws.
    window.addEventListener("resize", _.debounce(updateSize, 100));
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return windowSize;
}

const ReturnsTreemap = ({
  analytics,
  treemapClickHandler,
  horizontalPanePosition,
  verticalPanePosition
}) => {
  // Effect hook used to force a chart re-render on
  // changes to the horizontal and vertical panel positioning.
  // Approach taken from Stackoverflow
  const windowSize = useWindowSize();
  const [key, setkey] = useState(false);
  useEffect(() => {
    setkey((prevKey) => !prevKey);
  }, [horizontalPanePosition, verticalPanePosition, windowSize.width, windowSize.height]);
  const securities = Object.keys(analytics);

  let maxReturn = 0;
  let minReturn = 0;

  const return30daySeries = securities.map((security) => {
    const { timeSeries } = analytics[security].return_30d;
    const return30day = parseFloat(timeSeries[timeSeries.length - 1][1].toFixed(2));

    if (maxReturn < return30day) {
      maxReturn = return30day;
    }

    if (minReturn > return30day) {
      minReturn = return30day;
    }

    return [security, "Monthly Returns", Math.abs(return30day), return30day];
  });

  console.log(return30daySeries);

  let minColour = "";
  let midColour = "";
  let maxColour = "";

  if (minReturn <= 0 && maxReturn <= 0) {
    minColour = `${synthLightRedOne}`;
    midColour = `${synthRedInBetween}`;
    maxColour = `${synthLightRedTwo}`;
  } else if (minReturn >= 0 && maxReturn >= 0) {
    minColour = `${synthLightGreenOne}`;
    midColour = `${synthGreenInBetween}`;
    maxColour = `${synthLightGreenTwo}`;
  } else {
    minColour = `${synthLightRedOne}`;
    midColour = "#f7f7f7";
    maxColour = `${synthLightGreenTwo}`;
  }

  options.minColor = minColour;
  options.midColor = midColour;
  options.maxColor = maxColour;

  // eslint-disable-next-line no-unused-vars
  options.generateTooltip = (row, size, value) => {
    if (row === 0) {
      return "";
    }
    console.log(`row: ${row} size: ${size}`);

    return `<div style="font-size: 12px; background:rgba(0, 0, 0, 0.7); color: white; padding:5px; border-color:rgba(0, 0, 0, 0.4)"> Monthly Return: ${
      return30daySeries[row + 1][3]
    }% </div>`;
  };

  let previousSecurity = "";
  const treemapNodeClickHandler = (e) => {
    // eslint-disable-next-line no-unused-vars
    const { row, column } = e;
    const security = securities[row - 1];

    if (security === previousSecurity) {
      return;
    }

    treemapClickHandler(security);
    previousSecurity = security;
  };

  return30daySeries.unshift(["Monthly Returns", null, 0, 0]);
  return30daySeries.unshift(["Security", "Parent", "Abs, Return", "Return"]);

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
          // eslint-disable-next-line react/jsx-wrap-multilines
          <SpinnerLoaderContainer>
            <BounceLoader
              color={synthPurple}
              loading={analytics.isLoading}
              css={loaderOverride}
              size={90}
            />
          </SpinnerLoaderContainer>
        }
        chartEvents={[
          {
            eventName: "ready",
            callback: ({ chartWrapper, google }) => {
              const chart = chartWrapper.getChart();
              google.visualization.events.addListener(chart, "highlight", treemapNodeClickHandler);
            }
          }
        ]}
      />
    </ChartContainer>
  );
};

ReturnsTreemap.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  analytics: PropTypes.object.isRequired,
  treemapClickHandler: PropTypes.func.isRequired,
  verticalPanePosition: PropTypes.string.isRequired,
  horizontalPanePosition: PropTypes.string.isRequired
};

export default ReturnsTreemap;
