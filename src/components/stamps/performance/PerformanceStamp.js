/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Chart from "../utils/Chart";
import Stamp from "../Stamp";
import { DisplayWithPercent, NoData } from "../stamps-utils";

const Body = styled.div`
  background: #1c2024;
  position: absolute;
  top: 20px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  color: #cccccc;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const ChartSegment = styled.div`
  width: 33px;
  margin-right: 1px;
  height: 100%;
`;

const ChartBackground = styled.div`
  height: 54px;
  background: #292b2e;
  text-align: center;
  width: 33px;
  font-size: 9px;
  flex-direction: column;
  margin-right: 1px;
`;

const LineChart = styled.div`
  position: absolute;
  padding: 0 1px 0 2px;
  top: 38px;
  width: 100%;
  height: 60px;
  display: flex;
`;

/**
 * @visibleName Performance-Stamp
 */
const PerformanceStamp = ({ security, value, data, isNoData, zScore }) => {
  const roundedReturn = value.toPrecision(3);
  const tooltipText = `Last Daily Return: ${roundedReturn}%`;

  return (
    <Stamp security={security} title="Performance" zScore={zScore} tooltipText={tooltipText}>
      <Body>
        {isNoData ? (
          <NoData />
        ) : (
          <>
            <DisplayWithPercent value={value} />
            <LineChart>
              <Chart data={data} title="Performamce stamp" />
              <ChartSegment>
                <ChartBackground />
              </ChartSegment>
              <ChartSegment>
                <ChartBackground />
              </ChartSegment>
              <ChartSegment>
                <ChartBackground />
              </ChartSegment>
            </LineChart>
          </>
        )}
      </Body>
    </Stamp>
  );
};

PerformanceStamp.defaultProps = {
  isNoData: false
};

PerformanceStamp.propTypes = {
  security: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  isNoData: PropTypes.bool,
  zScore: PropTypes.number.isRequired
};

export default PerformanceStamp;
