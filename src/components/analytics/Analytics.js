import React from "react";
import SplitPane from "react-split-pane";
import styled from "styled-components";

import Macroanalysis from "../macroanalysis/Macroanalysis";
import Microanalysis from "../microanalysis/Microanalysis";
import { series, volume } from "../stamps/sample-data";

const StyledHorizontalSplitPane = styled(SplitPane)``;

const securities = ["Bitcoin", "Ethereum", "Litecoin", "Bitcoin Cash", "Dogecoin"];


const Analytics = () => (
  <StyledHorizontalSplitPane split="horizontal" defaultSize="57%">
    <Macroanalysis securities={securities} series={series} volume={volume} />
    <Microanalysis />
  </StyledHorizontalSplitPane>
);

export default Analytics;
