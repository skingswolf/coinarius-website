import React, { useState } from "react";
import { Layout, Switch } from "antd";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import "antd/dist/antd.css";

import { blackColour } from "../colourScheme";
import LandingPage from "../components/landingPage/LandingPage";

const { Header, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  height: 100%;
  background-color: ${blackColour};
  color: white;
`;
const StyledHeader = styled(Header)`
  position: relative;
  padding: 0;
  z-index: 1;
  width: 100%;
  border-bottom: 1px solid black;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 55% 20%;
  background-color: rgba(0, 0, 0, 0.4);
`;
const StyledContent = styled(Content)`
  height: 100%;
`;
const StyledLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
`;
const StyledLoader = styled(Loader)``;

const StyledHeaderLabel = styled.div`
  color: white;
  align-items: center;
  font-weight: bolder;
  font-size: 40px;
  margin-left: 52px;
`;

const StyledSwitchContainer = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 46% 54%;
  align-items: center;
  justify-content: start;
`;
const StyledSortByLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  color: white;
`;
const StyledSwitch = styled(Switch)`
  display: flex;
  justify-content: flex-start;
  width: 100px;
`;

const isLoading = false;
const loaderContainer = (
  <StyledLoaderContainer>
    <StyledLoader type="Oval" color="#00BFFF" height={80} width={80} />
  </StyledLoaderContainer>
);

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [sortKey, setSortKey] = useState("totalZScore");

  // eslint-disable-next-line no-unused-vars
  const onSwitchHandler = (isChecked, event) => {
    event.stopPropagation();

    setSortKey(isChecked ? "totalZScore" : "marketCap");
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <StyledHeaderLabel>Coinarius</StyledHeaderLabel>
        <div>&nbsp;</div>
        <StyledSwitchContainer>
          <StyledSortByLabel>Sort by:&nbsp;</StyledSortByLabel>
          <StyledSwitch
            checkedChildren="Significance"
            unCheckedChildren="Market Cap"
            onChange={onSwitchHandler}
            defaultChecked
          />
        </StyledSwitchContainer>
      </StyledHeader>
      <StyledContent>
        {isLoading ? loaderContainer : <LandingPage sortKey={sortKey} />}
      </StyledContent>
    </StyledLayout>
  );
};

export default App;
