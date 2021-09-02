/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// import AutocorrelationStamp from "../../stamps/autocorrelation/AutocorrelationStamp";
// import BitcoinCorrelationStamp from "../../stamps/bitcoinCorrelation/BitcoinCorrelationStamp";
// import MovingAverageStamp from "../../stamps/movingAverage/MovingAverageStamp";
import PerformanceStamp from "../../stamps/performance/PerformanceStamp";
// import RSIStamp from "../../stamps/rsi/RSIStamp";
import VolumeStamp from "../../stamps/volume/VolumeStamp";

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

const Row = ({ security, analytics }) => {
  const securityName = analytics[security].name;

  // Performance Stamp.
  const returnTimeSeries = analytics[security].return.timeSeries;
  const returnNumOfDays = 31;
  const returnTimeSeriesTail = returnTimeSeries.slice(
    Math.max(returnTimeSeries.length - returnNumOfDays, 1)
  );
  const lastReturn = returnTimeSeriesTail[returnTimeSeriesTail.length - 1][1];

  // Volume Stamp.
  const volumeTimeSeries = analytics[security].volume.timeSeries;
  const volumeNumOfDays = 5;
  const volumeTimeSeriesTail = volumeTimeSeries.slice(
    Math.max(volumeTimeSeries.length - volumeNumOfDays, 1)
  );
  const volumes = volumeTimeSeriesTail.map((volumeEntry) => volumeEntry[1]);
  const lastVolume = volumes[volumes.length - 1];

  return (
    <Body>
      <SecurityName>{securityName}</SecurityName>
      <Stamps>
        <PerformanceStamp value={lastReturn} data={returnTimeSeriesTail} />
        <VolumeStamp value={lastVolume} data={volumes} />

        {/* <AutocorrelationStamp value={-0.5} data={series} />
        <MovingAverageStamp value={1.3} data={series} />
        <BitcoinCorrelationStamp value={0.77} data={series} />
        <RSIStamp value={2.69} data={series} /> */}
      </Stamps>
    </Body>
  );
};

Row.propTypes = {
  security: PropTypes.string.isRequired,
  analytics: PropTypes.object.isRequired
};

export default Row;
