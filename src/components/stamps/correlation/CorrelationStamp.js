/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// import Chart from "../utils/Chart";
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

const AutoCorrelationLabel = styled.span`
  position: absolute;
  width: 100%;
  top: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 12px;
  text-align: center;
`;

const BtcCorrelationLabel = styled.span`
  position: absolute;
  width: 100%;
  top: 44px;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 12px;
  text-align: center;
`;

const EthCorrelationLabel = styled.span`
  position: absolute;
  width: 100%;
  top: 68px;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 12px;
  text-align: center;
`;

/**
 * @visibleName Correlation-Stamp
 */
const CorrelationStamp = ({
  security,
  autocorrelation,
  btcCorrelation,
  ethCorrelation,
  isNoData
}) => {
  const numOfDecimalPlaces = 2;
  const autocorrelationRounded = autocorrelation.toFixed(numOfDecimalPlaces);
  const btcCorrelationRounded = btcCorrelation.toFixed(numOfDecimalPlaces);
  const ethCorrelationRounded = ethCorrelation.toFixed(numOfDecimalPlaces);

  const tooltipText = `Correlation of ${security}'s returns with itself, BTC's returns, and ETH's returns`;

  return (
    <Stamp security={security} title="Correlation" tooltipText={tooltipText}>
      <Body>
        {isNoData ? (
          <NoData />
        ) : (
          <>
            <AutoCorrelationLabel>{`Auto Corr: ${autocorrelationRounded}`}</AutoCorrelationLabel>
            <BtcCorrelationLabel>{`BTC Corr: ${btcCorrelationRounded}`}</BtcCorrelationLabel>
            <EthCorrelationLabel>{`ETH Corr: ${ethCorrelationRounded}`}</EthCorrelationLabel>
          </>
        )}
      </Body>
    </Stamp>
  );
};

CorrelationStamp.defaultProps = {
  isNoData: false
};

CorrelationStamp.propTypes = {
  security: PropTypes.string.isRequired,
  autocorrelation: PropTypes.number.isRequired,
  btcCorrelation: PropTypes.number.isRequired,
  ethCorrelation: PropTypes.number.isRequired,
  isNoData: PropTypes.bool
};

export default CorrelationStamp;
