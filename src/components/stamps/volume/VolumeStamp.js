import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import BarChart from "../utils/BarChart";
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

const Volume = styled.span`
  color: #fcda41;
  position: absolute;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
`;

const SubTitle = styled.span`
  position: absolute;
  width: 100%;
  top: 21px;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 12px;
  text-align: center;
  color: #879ba6;
`;

const BarChartContainer = styled.div`
  position: absolute;
  padding: 0 5px;
  top: 38px;
  width: 100%;
  height: 60px;
  display: flex;
`;

const BarChartFooter = styled.div`
  position: absolute;
  top: 84px;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 12px;
  text-align: center;
  color: #879ba6;
`;
/**
 * @visibleName Volume-Stamp
 */
const VolumeStamp = ({ security, value, data, isNoData, zScore }) => {
  const million = 1000000;
  const billion = 1000000000;
  let roundedValue = value.toPrecision(3);
  let units = "";

  if (value % billion > 1) {
    units = "b";
    roundedValue /= billion;
  } else if (value % million > 1) {
    units = "m";
    roundedValue /= million;
  }

  const figure = `$${roundedValue}${units}`;
  const tooltipText = `${figure} worth of ${security} have traded in the last 24 hours`;

  return (
    <Stamp security={security} title="Volume" zScore={zScore} tooltipText={tooltipText}>
      <Body>
        {isNoData ? (
          <NoData />
        ) : (
          <>
            <Volume>{figure}</Volume>
            <SubTitle>30d AVG</SubTitle>
            <BarChartContainer>
              <BarChart data={data} title="Volume stamp" />
            </BarChartContainer>
            <BarChartFooter>Last 5D</BarChartFooter>
          </>
        )}
      </Body>
    </Stamp>
  );
};

VolumeStamp.defaultProps = {
  isNoData: false
};

VolumeStamp.propTypes = {
  security: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  isNoData: PropTypes.bool,
  zScore: PropTypes.number.isRequired
};

export default VolumeStamp;
