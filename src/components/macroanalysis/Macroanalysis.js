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

const Macroanalysis = ({ analytics }) => {
  const securities = Object.keys(analytics);

  return <Body>{getRows(securities, analytics)}</Body>;
};

Macroanalysis.propTypes = {
  analytics: PropTypes.object.isRequired
};

export default Macroanalysis;
