/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import RsiChart from "../utils/RsiChart";
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

const Rsi = styled.span`
  position: absolute;
  width: 100%;
  top: 3px;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
`;

const RsiVerdict = styled.span`
  position: absolute;
  width: 100%;
  top: 17px;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 20px;
  text-align: center;
`;

/**
 * @visibleName Rsi-Stamp
 */
const RsiStamp = ({ security, value, data, isNoData, zScore }) => {
  const roundedPrice = value.toFixed(2);
  const tooltipText = `Last Relative Strength Index: ${value}`;
  // eslint-disable-next-line no-nested-ternary
  const rsiVerdictText = roundedPrice > 70 ? "Overbought" : roundedPrice < 30 ? "Oversold" : "";

  return (
    <Stamp security={security} title="RSI" zScore={zScore} tooltipText={tooltipText}>
      <Body>
        {isNoData ? (
          <NoData />
        ) : (
          <>
            <Rsi>{roundedPrice}</Rsi>
            <RsiVerdict>{rsiVerdictText}</RsiVerdict>

            <LineChart>
              <RsiChart data={data} title="RSI Stamp" />
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

RsiStamp.defaultProps = {
  isNoData: false
};

RsiStamp.propTypes = {
  security: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  isNoData: PropTypes.bool,
  zScore: PropTypes.number.isRequired
};

export default RsiStamp;
