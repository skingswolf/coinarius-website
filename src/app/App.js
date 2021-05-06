import React from "react";
import { Layout } from "antd";
import Loader from "react-loader-spinner";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import "antd/dist/antd.css";

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

const StyledVerticalSplitPane = styled(SplitPane)`
  position: inherit !important;
`;
const StyledHorizontalSplitPane = styled(SplitPane)``;

const isLoading = false;
const calculateWidth = (size) => `${(size / window.innerWidth) * 100}%`;
const landingPage = (
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

const loaderContainer = (
  <StyledLoaderContainer>
    <StyledLoader type="Oval" color="#00BFFF" height={80} width={80} />
  </StyledLoaderContainer>
);

const App = () => {
  return (
    <StyledLayout>
      <StyledHeader />
      <StyledContent>{isLoading ? loaderContainer : landingPage}</StyledContent>
      <StyledFooter>Coinarius ©2020 Created by Steven Kingaby</StyledFooter>
    </StyledLayout>
  );
};

export default App;
