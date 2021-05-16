import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import PerformanceStamp from "../../stamps/performance/PerformanceStamp";
import { series } from "../../stamps/sample-data";

const Body = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 200px auto;
  padding: 4px;
  border-bottom: 1px green solid;
`;

const SecurityName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px red solid;
`;

const Stamps = styled.div`
  border: 1px blue solid;
  display: inline-flex;
  justify-content: center;
`;

const Row = ({ security }) => {
  return (
    <Body>
      <SecurityName>{security}</SecurityName>
      <Stamps>
        <PerformanceStamp value={5.96} data={series} />
        <PerformanceStamp value={-1.04} data={series} />
        <PerformanceStamp value={3} data={series} />
        <PerformanceStamp value={1.3} data={series} />
        <PerformanceStamp value={-4} data={series} />
        <PerformanceStamp value={2.69} data={series} />
      </Stamps>
    </Body>
  );
};

Row.propTypes = {
  security: PropTypes.string.isRequired
};

export default Row;
