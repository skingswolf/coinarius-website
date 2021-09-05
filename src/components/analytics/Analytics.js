/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import _ from "lodash";
import { css } from "@emotion/react";
import io from "socket.io-client";
import BounceLoader from "react-spinners/BounceLoader";
import PropTypes from "prop-types";
import React, { useEffect, useState, useMemo } from "react";
import SplitPane from "react-split-pane";
import styled from "styled-components";

import Macroanalysis from "../macroanalysis/Macroanalysis";
import ReturnsTreemap from "../returnsTreemap/ReturnsTreemap";
import { synthPurple } from "../../colourScheme";

const StyledHorizontalSplitPane = styled(SplitPane)``;

const loaderOverride = css`
  display: block;
`;

const StyledSpinnerLoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const formatAnalytics = (apiAnalytics) => {
  const outputAnalytics = {};

  Object.keys(apiAnalytics).forEach((security) => {
    outputAnalytics[security] = {};

    Object.keys(apiAnalytics[security]).forEach((analytic) => {
      if (analytic === "name" || analytic === "total_z_score") {
        return;
      }

      const timeSeries = apiAnalytics[security][analytic].time_series;
      timeSeries[timeSeries.length - 1][1] = apiAnalytics[security][analytic][`last_${analytic}`];

      outputAnalytics[security][analytic] = {
        timeSeries,
        zScore: apiAnalytics[security][analytic].last_z_score
      };
    });

    outputAnalytics[security].name = apiAnalytics[security].name;
    outputAnalytics[security].totalZScore = apiAnalytics[security].total_z_score;
  });

  return outputAnalytics;
};

const updateAnalytics = (apiAnalytics, currentAnalytics) => {
  Object.keys(apiAnalytics).forEach((security) => {
    Object.keys(apiAnalytics[security]).forEach((analytic) => {
      if (analytic === "name" || analytic === "total_z_score") {
        return;
      }

      const timeSeries = apiAnalytics[security][analytic].time_series;
      const updatedTimeSeries =
        timeSeries == null ? currentAnalytics[security][analytic].timeSeries : timeSeries;

      updatedTimeSeries[updatedTimeSeries.length - 1][1] =
        apiAnalytics[security][analytic][`last_${analytic}`];

      // eslint-disable-next-line no-param-reassign
      currentAnalytics[security][analytic] = {
        timeSeries: updatedTimeSeries,
        zScore: apiAnalytics[security][analytic].last_z_score
      };
    });

    // eslint-disable-next-line no-param-reassign
    currentAnalytics[security].totalZScore = apiAnalytics[security].total_z_score;
  });

  return currentAnalytics;
};

const analyticsBaseUrl = "https://coinarius-analytics.herokuapp.com";
let socket = null;

const Analytics = ({ sortKey, verticalPanePosition }) => {
  const [analytics, setAnalytics] = useState({
    isLoading: true,
    data: null,
    scrollTo: "unknown",
    scrollToCount: 0
  });

  // Fetch data from /analytics endpoint.
  useEffect(() => {
    const analyticsUrl = `${analyticsBaseUrl}/analytics`;

    const fetchData = async () => {
      try {
        console.log("Fetching analytics from Coinarius Analytics API.");
        const response = await fetch(analyticsUrl);
        const jsonResponse = await response.json();
        console.log(jsonResponse);

        console.log("Formatting analytics from Coinarius Analytics API.");
        const formattedAnalytics = formatAnalytics(jsonResponse);

        setAnalytics((a) => ({
          ...a,
          isLoading: false,
          data: formattedAnalytics
        }));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  // Connect and fetch data from Coinarius Analytics WebSocket service.
  useEffect(() => {
    console.log("Initialising socket client for Coinarius Analytics WebSocket service.");
    socket = io(analyticsBaseUrl);
    socket.on("connect", () => {
      console.log("Successfully connected to Coinarius Analytics WebSocket service.");
      socket.emit("register", { data: "register" });
    });

    socket.on(
      "fresh_analytics",
      (msg) => {
        console.log("Fresh data received from Coinarius NLP WebSocket service.");
        setAnalytics((a) => ({ ...a, data: updateAnalytics(msg.analytics, a.data) }));
      },
      []
    );

    // eslint-disable-next-line consistent-return
    return () => {
      console.log("Disconnecting from Coinarius Analytics WebSocket service.");
      socket.disconnect();
    };
  }, []);

  const defaultHorizontalPanePosition = "57%";
  const [horizontalPanePosition, setHorizontalPanePosition] = useState(
    defaultHorizontalPanePosition
  );

  const calculateHeight = (size) => `${(size / window.innerHeight) * 100}%`;
  const onChangeHandler = (size) => {
    const newHorizontalPanePosition = calculateHeight(size);
    localStorage.setItem("splitHorizontalPosition", newHorizontalPanePosition);
    setHorizontalPanePosition(newHorizontalPanePosition);
  };

  const treemapClickHandler = (security) => {
    console.log(`Scrolling to: ${security}`);
    setAnalytics((a) => ({ ...a, scrollTo: security, scrollToCount: a.scrollToCount + 1 }));
  };
  const debouncedChangeHandler = useMemo(() => _.debounce(treemapClickHandler, 300), []);

  // After unmounting stop invoking `debouncedChangeHandler`.
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <StyledHorizontalSplitPane
      split="horizontal"
      defaultSize={localStorage.getItem("splitHorizontalPosition") || defaultHorizontalPanePosition}
      onChange={_.debounce(onChangeHandler, 100)}
      pane2Style={{
        display: "grid",
        gridTemplateRows: "100%",
        gridTemplateColumns: "100%"
      }}
    >
      {analytics.isLoading ? (
        <StyledSpinnerLoaderContainer>
          <BounceLoader
            color={synthPurple}
            loading={analytics.isLoading}
            css={loaderOverride}
            size={90}
          />
        </StyledSpinnerLoaderContainer>
      ) : (
        <Macroanalysis
          analytics={analytics.data}
          sortKey={sortKey}
          scrollTo={analytics.scrollTo}
          scrollToCount={analytics.scrollToCount}
        />
      )}
      {analytics.isLoading ? (
        <StyledSpinnerLoaderContainer>
          <BounceLoader
            color={synthPurple}
            loading={analytics.isLoading}
            css={loaderOverride}
            size={90}
          />
        </StyledSpinnerLoaderContainer>
      ) : (
        <ReturnsTreemap
          id="my-returns-treemap"
          analytics={analytics.data}
          treemapClickHandler={debouncedChangeHandler}
          horizontalPanePosition={horizontalPanePosition}
          verticalPanePosition={verticalPanePosition}
        />
      )}
    </StyledHorizontalSplitPane>
  );
};

Analytics.propTypes = {
  sortKey: PropTypes.string.isRequired,
  verticalPanePosition: PropTypes.string.isRequired
};

export default Analytics;
