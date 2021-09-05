/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import DoubleChart from "../utils/DoubleChart";
import Stamp from "../Stamp";
import { NoData } from "../stamps-utils";

const Body = styled.div`
  background: #202424;
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

const Price = styled.span`
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
 * @visibleName Price-Stamp
 */
const PriceStamp = ({
  security,
  price,
  movingAverage,
  priceData,
  movingAverageData,
  isNoData,
  zScore
}) => {
  const numDecimalPlaces = price < 1 ? 4 : 2;
  const roundedPrice = price.toFixed(numDecimalPlaces);
  const roundedMovingAverage = movingAverage.toFixed(numDecimalPlaces);
  const tooltipText = `Last Price: ${roundedPrice}, Last 30 Day Moving Average: ${roundedMovingAverage}`;

  return (
    <Stamp security={security} title="Price" zScore={zScore} tooltipText={tooltipText}>
      <Body>
        {isNoData ? (
          <NoData />
        ) : (
          <>
            <Price>{`$${roundedPrice}`}</Price>
            <LineChart>
              <DoubleChart data={priceData} otherData={movingAverageData} title="Price Stamp" />
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

PriceStamp.defaultProps = {
  isNoData: false
};

PriceStamp.propTypes = {
  security: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  movingAverage: PropTypes.number.isRequired,
  priceData: PropTypes.array.isRequired,
  movingAverageData: PropTypes.array.isRequired,
  isNoData: PropTypes.bool,
  zScore: PropTypes.number.isRequired
};

export default PriceStamp;
