import React from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  synthLightRedOne,
  synthLightRedTwo,
  synthLightGreenOne,
  synthLightGreenTwo
} from "../../colourScheme";

const significanceLevel = 0.5;
const Border = styled.div`
  position: relative;
  width: 111px;
  height: 120px;
  background: ${(props) => {
    if (props.zScore >= significanceLevel) {
      return `linear-gradient(242.74deg, ${synthLightGreenOne} 0.56%, ${synthLightGreenTwo} 100%)`;
    }

    if (props.zScore <= -1 * significanceLevel) {
      return `linear-gradient(45deg, ${synthLightRedOne} 0%, ${synthLightRedTwo} 100%)`;
    }

    return "#1c2024";
  }};
  border: 1px solid black;
  border-radius: 4px;
  margin-right: 7px;
`;

const Title = styled.span`
  position: absolute;
  width: 100%;
  top: calc(50% - 20px / 2 - 48px);
  font-size: 12px;
  font-style: normal;
  font-weight: bold;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;

const Stamp = ({ security, title, children, zScore, tooltipText }) => {
  const tooltipId = `${security}-${title}`;

  return (
    <>
      <Border data-tip data-for={tooltipId} zScore={zScore}>
        <Title>{title}</Title>
        {children}
      </Border>
      <ReactTooltip id={tooltipId} aria-haspopup="true">
        {tooltipText}
      </ReactTooltip>
    </>
  );
};

Stamp.defaultProps = {
  children: null,
  zScore: 0,
  tooltipText: "Dummy tooltip placeholder"
};

Stamp.propTypes = {
  security: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  zScore: PropTypes.number,
  tooltipText: PropTypes.string
};

export default Stamp;
