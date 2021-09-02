/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const Macroanalysis = ({ analytics, sortRows }) => {
  let securities = Object.keys(analytics).map((security) => {
    const { timeSeries } = analytics[security].market_cap;

    return {
      security,
      market_cap: timeSeries[timeSeries.length - 1][1],
      total_z_score: analytics[security].total_z_score
    };
  });

  securities.sort(sortRows);
  securities = securities.map((s) => s.security);

  return <Body>{getRows(securities, analytics)}</Body>;
};

Macroanalysis.propTypes = {
  analytics: PropTypes.object.isRequired,
  sortRows: PropTypes.func.isRequired
};

export default Macroanalysis;
