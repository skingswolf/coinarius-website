import React from "react";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import "antd/dist/antd.css";

const StyledVerticalSplitPane = styled(SplitPane)`
  position: inherit !important;
`;
const StyledHorizontalSplitPane = styled(SplitPane)``;

const calculateWidth = (size) => `${(size / window.innerWidth) * 100}%`;

const LandingPage = () => (
  <StyledVerticalSplitPane
    split="vertical"
    defaultSize={localStorage.getItem("splitVerticalPosition") || "30%"}
    onChange={(size) => localStorage.setItem("splitVerticalPosition", calculateWidth(size))}
  >
    <div>Pane Component 1</div>
    <StyledHorizontalSplitPane split="horizontal" defaultSize="35%">
      <div>Pane Component 2</div>
      <div>Pane Component 3</div>
    </StyledHorizontalSplitPane>
  </StyledVerticalSplitPane>
);

export default LandingPage;
