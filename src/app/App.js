import React, { useState } from "react";
import { Layout, Switch } from "antd";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import "antd/dist/antd.css";

import LandingPage from "../components/landingPage/LandingPage";

const { Header, Content, Footer } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  height: 100%;
`;
const StyledHeader = styled(Header)`
  position: relative;
  padding: 0;
  z-index: 1;
  width: 100%;
  border-bottom: 1px solid rgb(233, 233, 233);
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 50% 25%;
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
const StyledFooter = styled(Footer)`
  text-align: center;
  border-top: 1px solid #000;
  padding: 10px 50px;
`;

const StyledHeaderLabel = styled.div`
  display: flex;
  color: white;
  border: 1px solid red;
  align-items: center;
  justify-content: center;
`;

const StyledSwitchContainer = styled.div`
  border: 1px solid green;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 47% 53%;
  align-items: center;
  justify-content: space-around;
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
      <StyledFooter>Coinarius ©2020 Created by Steven Kingaby</StyledFooter>
    </StyledLayout>
  );
};

export default App;
