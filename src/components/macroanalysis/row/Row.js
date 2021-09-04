/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CorrelationStamp from "../../stamps/correlation/CorrelationStamp";
import PriceStamp from "../../stamps/price/PriceStamp";
import PerformanceStamp from "../../stamps/performance/PerformanceStamp";
import RsiStamp from "../../stamps/rsi/RsiStamp";
import VolumeStamp from "../../stamps/volume/VolumeStamp";
import VolumeMomentumStamp from "../../stamps/volumeMomentum/VolumeMomentumStamp";

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
  font-size: 20px;
`;

const Stamps = styled.div`
  border: 1px blue solid;
  display: inline-flex;
  justify-content: space-evenly;
`;

const createStamp = (security, analyticName, zScore, stampAnalytics) => {
  // Performance Stamp.
  if (analyticName === "return") {
    const returnTimeSeries = stampAnalytics.return.timeSeries;
    const returnNumOfDays = 31;
    const returnTimeSeriesTail = returnTimeSeries.slice(
      Math.max(returnTimeSeries.length - returnNumOfDays, 1)
    );
    const lastReturn = returnTimeSeriesTail[returnTimeSeriesTail.length - 1][1];

    return (
      <PerformanceStamp
        key={analyticName}
        security={security}
        value={lastReturn}
        data={returnTimeSeriesTail}
        zScore={zScore}
      />
    );
  }

  // Price Stamp.
  if (analyticName === "price") {
    const numOfDays = 31;

    const movingAverageTimeSeries = stampAnalytics.moving_average_30d.timeSeries;
    const movingAverageTimeSeriesTail = movingAverageTimeSeries.slice(
      Math.max(movingAverageTimeSeries.length - numOfDays, 1)
    );
    const lastMovingAverage =
      movingAverageTimeSeriesTail[movingAverageTimeSeriesTail.length - 1][1];

    const priceTimeSeries = stampAnalytics.price.timeSeries;
    const priceTimeSeriesTail = priceTimeSeries.slice(
      Math.max(priceTimeSeries.length - numOfDays, 1)
    );
    const lastPrice = priceTimeSeriesTail[priceTimeSeriesTail.length - 1][1];

    return (
      <PriceStamp
        key={analyticName}
        security={security}
        price={lastPrice}
        movingAverage={lastMovingAverage}
        priceData={priceTimeSeriesTail}
        movingAverageData={movingAverageTimeSeriesTail}
        zScore={zScore}
      />
    );
  }

  // RSI Stamp.
  if (analyticName === "rsi") {
    const rsiTimeSeries = stampAnalytics.rsi.timeSeries;
    const rsiNumOfDays = 31;
    const rsiTimeSeriesTail = rsiTimeSeries.slice(Math.max(rsiTimeSeries.length - rsiNumOfDays, 1));
    const lastRsi = rsiTimeSeriesTail[rsiTimeSeriesTail.length - 1][1];

    return (
      <RsiStamp
        key={analyticName}
        security={security}
        value={lastRsi}
        data={rsiTimeSeriesTail}
        zScore={zScore}
      />
    );
  }

  // Volume Stamp.
  if (analyticName === "volume") {
    const volumeTimeSeries = stampAnalytics.volume.timeSeries;
    const volumeNumOfDays = 5;
    const volumeTimeSeriesTail = volumeTimeSeries.slice(
      Math.max(volumeTimeSeries.length - volumeNumOfDays, 1)
    );
    const volumes = volumeTimeSeriesTail.map((volumeEntry) => volumeEntry[1]);
    const lastVolume = volumes[volumes.length - 1];

    return (
      <VolumeStamp
        key={analyticName}
        security={security}
        value={lastVolume}
        data={volumes}
        zScore={zScore}
      />
    );
  }

  // Volume Momentum Stamp.
  if (analyticName === "volume_diff") {
    const volumeDiffTimeSeries = stampAnalytics.volume_diff.timeSeries;
    const volumeDiffNumOfDays = 31;
    const volumeDiffTimeSeriesTail = volumeDiffTimeSeries.slice(
      Math.max(volumeDiffTimeSeries.length - volumeDiffNumOfDays, 1)
    );
    const lastVolumeDiff = volumeDiffTimeSeriesTail[volumeDiffTimeSeriesTail.length - 1][1];

    return (
      <VolumeMomentumStamp
        key={analyticName}
        security={security}
        value={lastVolumeDiff}
        data={volumeDiffTimeSeriesTail}
        zScore={zScore}
      />
    );
  }

  // Correlation Stamp.
  if (analyticName === "correlation") {
    const autocorrelationTimeSeries = stampAnalytics.autocorrelation.timeSeries;
    const lastAutocorrelation = autocorrelationTimeSeries[autocorrelationTimeSeries.length - 1][1];

    const btcCorrelationTimeSeries = stampAnalytics.btc_correlation.timeSeries;
    const lastBtcCorrelation = btcCorrelationTimeSeries[btcCorrelationTimeSeries.length - 1][1];

    const ethCorrelationTimeSeries = stampAnalytics.eth_correlation.timeSeries;
    const lastEthCorrelation = ethCorrelationTimeSeries[ethCorrelationTimeSeries.length - 1][1];

    // Change this later to use rolling correlation z-scores.
    const correlationZScore =
      1.96 * ((lastAutocorrelation + lastBtcCorrelation + lastEthCorrelation) / 3);

    return (
      <CorrelationStamp
        key={analyticName}
        security={security}
        autocorrelation={lastAutocorrelation}
        btcCorrelation={lastBtcCorrelation}
        ethCorrelation={lastEthCorrelation}
        zScore={correlationZScore}
      />
    );
  }

  return <div key={analyticName}>{analyticName}</div>;
};

const Row = React.forwardRef(({ security, analytics }, ref) => {
  const securityName = analytics[security].name;
  const nonStampAnalytics = [
    "autocorrelation",
    "btc_correlation",
    "eth_correlation",
    "market_cap",
    "return_30d",
    "name",
    "totalZScore",
    "moving_average_30d",
    "price_diff"
  ];

  const stampAnalytics = [{ analyticName: "correlation", zScore: 0 }];

  Object.keys(analytics[security]).forEach((analyticName) => {
    if (nonStampAnalytics.includes(analyticName)) {
      return;
    }

    const { zScore } = analytics[security][analyticName];

    stampAnalytics.push({
      analyticName,
      zScore
    });
  });

  stampAnalytics.sort((stamp, otherStamp) => Math.abs(otherStamp.zScore) - Math.abs(stamp.zScore));
  // stampAnalytics = stampAnalytics.map((s) => s.analyticName);

  return (
    <Body ref={ref}>
      <SecurityName>{securityName}</SecurityName>
      <Stamps>
        {stampAnalytics.map(({ analyticName, zScore }) =>
          createStamp(security, analyticName, zScore, analytics[security])
        )}
      </Stamps>
    </Body>
  );
});

Row.propTypes = {
  security: PropTypes.string.isRequired,
  analytics: PropTypes.object.isRequired
};

export default Row;
