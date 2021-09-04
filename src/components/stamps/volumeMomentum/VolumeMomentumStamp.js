/* eslint-disable no-nested-ternary */
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

const VolumeMomentum = styled.span`
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
 * @visibleName Volume-Momentum-Stamp
 */
const VolumeMomentumStamp = ({ security, value, data, isNoData, zScore }) => {
  const million = 1000000;
  const billion = 1000000000;
  let units = "";
  let roundedVolumeChange = value.toPrecision(3);
  const absRoundedVolumeChange = Math.abs(roundedVolumeChange);

  if (absRoundedVolumeChange % billion > 1) {
    units = "b";
    roundedVolumeChange /= billion;
  } else if (absRoundedVolumeChange % million > 1) {
    units = "m";
    roundedVolumeChange /= million;
  }

  const sign = roundedVolumeChange > 0 ? "+" : roundedVolumeChange < 0 ? "-" : "";
  const phrasing = roundedVolumeChange > 0 ? "more" : roundedVolumeChange < 0 ? "fewer" : "";
  const tooltipText = `$${Math.abs(
    roundedVolumeChange
  )}${units} ${phrasing} traded in ${security} than in the previous day`;

  return (
    <Stamp security={security} title="Vol. Momentum" zScore={zScore} tooltipText={tooltipText}>
      <Body>
        {isNoData ? (
          <NoData />
        ) : (
          <>
            <VolumeMomentum>{`${sign}$${Math.abs(roundedVolumeChange)}${units}`}</VolumeMomentum>
            <LineChart>
              <Chart data={data} title="Volume Momentum Stamp" />
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

VolumeMomentumStamp.defaultProps = {
  isNoData: false
};

VolumeMomentumStamp.propTypes = {
  security: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  isNoData: PropTypes.bool,
  zScore: PropTypes.number.isRequired
};

export default VolumeMomentumStamp;
