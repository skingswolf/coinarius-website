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

const getRows = (securities, series, volume) => {
  console.log(securities)

  return securities.map((security) => (
    <Row key={security} security={security} series={series} volume={volume} />
  ));
};

const Macroanalysis = ({ securities, series, volume }) => {
  return <Body>{getRows(securities, series, volume)}</Body>;
};

Macroanalysis.propTypes = {
  securities: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
  volume: PropTypes.array.isRequired
};

export default Macroanalysis;
