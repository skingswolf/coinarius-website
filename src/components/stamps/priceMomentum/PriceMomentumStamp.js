/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Chart from "../utils/Chart";
import Stamp from "../Stamp";
import { NoData } from "../stamps-utils";

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

const PriceMomentum = styled.span`
  position: absolute;
  width: 100%;
  top: 7px;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
`;

/**
 * @visibleName Price-Momentum-Stamp
 */
const PriceMomentumStamp = ({ security, value, data, isNoData, zScore }) => {
  const numDecimalPlaces = value < 1 ? 4 : 2;
  const roundedPriceChange = value.toFixed(numDecimalPlaces);
  // eslint-disable-next-line no-nested-ternary
  const sign = roundedPriceChange > 0 ? "+" : roundedPriceChange < 0 ? "-" : "";
  const tooltipText = `24 Hour Price Change: ${sign}$${Math.abs(roundedPriceChange)}`;

  return (
    <Stamp security={security} title="Price Momentum" zScore={zScore} tooltipText={tooltipText}>
      <Body>
        {isNoData ? (
          <NoData />
        ) : (
          <>
            <PriceMomentum>{`${sign}$${Math.abs(roundedPriceChange)}`}</PriceMomentum>
            <LineChart>
              <Chart data={data} title="Price Momentum Stamp" />
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

PriceMomentumStamp.defaultProps = {
  isNoData: false
};

PriceMomentumStamp.propTypes = {
  security: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  isNoData: PropTypes.bool,
  zScore: PropTypes.number.isRequired
};

export default PriceMomentumStamp;
