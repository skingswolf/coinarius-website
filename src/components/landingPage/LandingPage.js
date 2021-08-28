import React from "react";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import "antd/dist/antd.css";

import Analytics from "../analytics/Analytics";
import Newsfeed from "../newsfeed/Newsfeed";

const StyledVerticalSplitPane = styled(SplitPane)`
  position: inherit !important;
`;

const calculateWidth = (size) => `${(size / window.innerWidth) * 100}%`;

const LandingPage = () => (
  <StyledVerticalSplitPane
    split="vertical"
    defaultSize={localStorage.getItem("splitVerticalPosition") || "30%"}
    onChange={(size) => localStorage.setItem("splitVerticalPosition", calculateWidth(size))}
  >
    <Newsfeed />
    <Analytics />
  </StyledVerticalSplitPane>
);

export default LandingPage;
