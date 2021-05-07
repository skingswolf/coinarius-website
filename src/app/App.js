import React from "react";
import { Layout } from "antd";
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

const isLoading = false;

const loaderContainer = (
  <StyledLoaderContainer>
    <StyledLoader type="Oval" color="#00BFFF" height={80} width={80} />
  </StyledLoaderContainer>
);

const App = () => {
  return (
    <StyledLayout>
      <StyledHeader />
      <StyledContent>{isLoading ? loaderContainer : <LandingPage />}</StyledContent>
      <StyledFooter>Coinarius ©2020 Created by Steven Kingaby</StyledFooter>
    </StyledLayout>
  );
};

export default App;
