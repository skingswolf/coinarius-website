/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// eslint-disable-next-line import/no-named-as-default
import Row from "./row/Row";

const Body = styled.div`
  display: grid;
  width: 100%;
  overflow: scroll;
`;

const getRows = (securities, analytics) => {
  return securities.map((security) => (
    <Row key={security} security={security} analytics={analytics} />
  ));
};

const Macroanalysis = ({ analytics, sortKey }) => {
  let securities = Object.keys(analytics).map((security) => {
    const { timeSeries } = analytics[security].market_cap;

    return {
      security,
      marketCap: timeSeries[timeSeries.length - 1][1],
      totalZScore: analytics[security].totalZScore
    };
  });

  // Sort rows in descending order in whatever chosen key.
  securities.sort((row, otherRow) => otherRow[sortKey] - row[sortKey]);
  securities = securities.map((s) => s.security);

  return <Body>{getRows(securities, analytics)}</Body>;
};

Macroanalysis.propTypes = {
  analytics: PropTypes.object.isRequired,
  sortKey: PropTypes.string.isRequired
};

export default Macroanalysis;
