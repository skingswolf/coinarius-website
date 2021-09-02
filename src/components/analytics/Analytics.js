/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { css } from "@emotion/react";
import io from "socket.io-client";
import MoonLoader from "react-spinners/MoonLoader";
import React, { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import styled from "styled-components";

import Macroanalysis from "../macroanalysis/Macroanalysis";
import Microanalysis from "../microanalysis/Microanalysis";

const StyledHorizontalSplitPane = styled(SplitPane)``;

const loaderOverride = css`
  display: block;
  margin: 0 auto;
  border-color: red;
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
    outputAnalytics[security].total_z_score = apiAnalytics[security].total_z_score;
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
    currentAnalytics[security].total_z_score = apiAnalytics[security].total_z_score;
  });

  return currentAnalytics;
};

const analyticsBaseUrl = "https://coinarius-analytics.herokuapp.com";
let socket = null;

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    isLoading: true,
    data: null
  });

  // eslint-disable-next-line no-unused-vars
  const [sortKey, setSortKey] = useState("total_z_score");

  // Sort rows in descending order in whatever chosen key.
  const sortRows = (row, otherRow) => otherRow[sortKey] - row[sortKey];

  // Fetch data from /analytics endpoint.
  useEffect(() => {
    const analyticsUrl = `${analyticsBaseUrl}/analytics`;

    const fetchData = async () => {
      try {
        console.log("Fetching analytics from Coinarius Analytics  API.");
        const response = await fetch(analyticsUrl);
        const jsonResponse = await response.json();
        console.log(jsonResponse);

        console.log("Formatting analytics from Coinarius Analytics API.");
        const formattedAnalytics = formatAnalytics(jsonResponse);

        setAnalytics({
          isLoading: false,
          data: formattedAnalytics
        });
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

  return (
    <StyledHorizontalSplitPane split="horizontal" defaultSize="57%">
      {analytics.isLoading ? (
        <MoonLoader color="red" loading={analytics.isLoading} css={loaderOverride} size={150} />
      ) : (
        <Macroanalysis analytics={analytics.data} sortRows={sortRows} />
      )}
      <Microanalysis />
    </StyledHorizontalSplitPane>
  );
};

export default Analytics;
