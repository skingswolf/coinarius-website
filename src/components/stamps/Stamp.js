import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Border = styled.div`
  position: relative;
  width: 111px;
  height: 120px;
  background: #1c2024;
  // background: linear-gradient(45deg, #8f151c 0%, #ed326a 100%);
  // background: linear-gradient(242.74deg, #98d757 0.56%, #0b5946 100%);
  // border-color: transparent;
  border: 1px solid #2f3135;
  border-radius: 4px;
  margin-right: 7px;
`;

const Title = styled.span`
  position: absolute;
  width: 100%;
  top: calc(50% - 20px / 2 - 48px);
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;

const Stamp = ({ title, children }) => {
  return (
    <Border>
      <Title>{title}</Title>
      {children}
    </Border>
  );
};

Stamp.defaultProps = {
  children: null
};

Stamp.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Stamp;