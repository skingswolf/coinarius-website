import React from "react";
import { Link, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, BookOutlined, BulbOutlined } from "@ant-design/icons";
import styled from "styled-components";
import "antd/dist/antd.css";

import Blog from "../components/blog/Blog";
import Home from "../components/home/Home";
import Almonry from "../components/almonry/Almonry";
import Children from "../components/children/Children";

const { Header, Footer } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;
const StyledHeader = styled(Header)`
  position: relative;
  padding: 0;
  z-index: 1;
  width: 100%;
  border-bottom: 1px solid rgb(233, 233, 233);
`;
const StyledFooter = styled(Footer)`
  text-align: center;
  border-top: 1px solid rgb(233, 233, 233);
`;

const { SubMenu } = Menu;

const App = () => {
  const isExactPath = true;

  return (
    <StyledLayout>
      <StyledHeader>
        <Menu mode="horizontal">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <SubMenu icon={<BulbOutlined />} title="Projects">
            <Menu.Item key="children">
              <Link to="/projects/children">Children</Link>
            </Menu.Item>
            <Menu.Item key="almonry">
              <Link to="/projects/almonry">Almonry</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu icon={<BookOutlined />} title="Blog">
            <Menu.Item key="book">
              <Link to="/blog">March 2017</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </StyledHeader>

      <Route exact={isExactPath} path="/" component={Home} />
      <Route exact={isExactPath} path="/projects/children" component={Children} />
      <Route exact={isExactPath} path="/projects/almonry" component={Almonry} />
      <Route exact={isExactPath} path="/blog" component={Blog} />

      <StyledFooter>Temple Design ©2020 Created by Steven Kingaby</StyledFooter>
    </StyledLayout>
  );
};

export default App;
