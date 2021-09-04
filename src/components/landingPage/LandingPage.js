import _ from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import "antd/dist/antd.css";

import Analytics from "../analytics/Analytics";
import Newsfeed from "../newsfeed/Newsfeed";

const StyledVerticalSplitPane = styled(SplitPane)`
  position: inherit !important;
`;

const LandingPage = ({ sortKey }) => {
  const defaultVerticalPanePosition = "30%";
  const [verticalPanePosition, setVerticalPanePosition] = useState(defaultVerticalPanePosition);

  const calculateWidth = (size) => `${(size / window.innerWidth) * 100}%`;
  const onChangeHandler = (size) => {
    const newVerticalPanePosition = calculateWidth(size);
    localStorage.setItem("splitVerticalPosition", newVerticalPanePosition);
    setVerticalPanePosition(newVerticalPanePosition);
  };

  return (
    <StyledVerticalSplitPane
      split="vertical"
      defaultSize={defaultVerticalPanePosition}
      onChange={_.debounce(onChangeHandler, 100)}
    >
      <Newsfeed />
      <Analytics sortKey={sortKey} verticalPanePosition={verticalPanePosition} />
    </StyledVerticalSplitPane>
  );
};

LandingPage.propTypes = {
  sortKey: PropTypes.string.isRequired
};

export default LandingPage;
