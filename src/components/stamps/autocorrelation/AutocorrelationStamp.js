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

const Autocorrelation = styled.span`
  position: absolute;
  width: 100%;
  top: 4px;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
`;

const SubTitle = styled.span`
  position: absolute;
  width: 100%;
  top: 22px;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 12px;
  text-align: center;
  color: #879ba6;
`;

const ChartSegment = styled.div`
  width: 33px;
  margin-right: 1px;
  height: 100%;
`;

const ChartBackground = styled.div`
  height: 47px;
  background: #292b2e;
  text-align: center;
  width: 33px;
  font-size: 9px;
  flex-direction: column;
  margin-right: 1px;
`;

const ChartLabel = styled.div`
  width: 33px;
  height: 12px;
  font-size: 9px;
  margin-right: 1px;
  text-align: center;
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
 * @visibleName Autocorrelation-Stamp
 */
const AutocorrelationStamp = ({ value, data, isNoData }) => {
  return (
    <Stamp title="Autocorrelation">
      <Body>
        {isNoData ? (
          <NoData />
        ) : (
          <>
            <Autocorrelation>{value}</Autocorrelation>
            <SubTitle>vs. Ind (1 wk)</SubTitle>
            <LineChart>
              <Chart data={data} title="Performamce stamp" />
              <ChartSegment>
                <ChartBackground />
                <ChartLabel>-3</ChartLabel>
              </ChartSegment>
              <ChartSegment>
                <ChartBackground />
                <ChartLabel>-2</ChartLabel>
              </ChartSegment>
              <ChartSegment>
                <ChartBackground />
                <ChartLabel>-1</ChartLabel>
              </ChartSegment>
            </LineChart>
          </>
        )}
      </Body>
    </Stamp>
  );
};

AutocorrelationStamp.defaultProps = {
  isNoData: false
};

AutocorrelationStamp.propTypes = {
  value: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  isNoData: PropTypes.bool
};

export default AutocorrelationStamp;