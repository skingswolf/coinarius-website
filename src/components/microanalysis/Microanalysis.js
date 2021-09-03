/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import React from "react";

const Microanalysis = ({ heatmapClickHandler }) => {
  const clickhandler = () => {
    heatmapClickHandler("DOGE");
  };

  return (
    <>
      <div>
        Microanalysis - drilldown of the selected tile. \n Stamps: Performance, Moving Average,
        Volume, Autocorrelation, Bitcoin correlation, Market Cap Share
      </div>
      <div onClick={clickhandler}>CLICK ME!</div>
    </>
  );
};

// () => heatmapClickHandler("DOGE")
Microanalysis.propTypes = {
  heatmapClickHandler: PropTypes.func.isRequired
};

export default Microanalysis;
