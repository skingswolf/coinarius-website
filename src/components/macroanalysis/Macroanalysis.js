/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useMemo, createRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// eslint-disable-next-line import/no-named-as-default
import Row from "./row/Row";

const Body = styled.div`
  display: grid;
  width: 100%;
  overflow: scroll;
`;

const getRows = (securities, analytics, refs) => {
  return securities.map((security) => (
    <Row key={security} ref={refs[security]} security={security} analytics={analytics} />
  ));
};

const Macroanalysis = ({ analytics, sortKey, scrollTo, scrollToCount }) => {
  let securities = Object.keys(analytics).map((security) => {
    const { timeSeries } = analytics[security].market_cap;

    return {
      security,
      marketCap: timeSeries[timeSeries.length - 1][1],
      totalZScore: analytics[security].totalZScore
    };
  });

  // Sort rows in descending order in whatever chosen key.
  securities.sort((row, otherRow) => otherRow[sortKey] - row[sortKey]);
  securities = securities.map((s) => s.security);

  const refs = useMemo(() => {
    const securityRefs = {};

    securities.forEach((security) => {
      securityRefs[security] = createRef();
    });

    return securityRefs;
  }, [securities.join(",")]);

  const scrollToBottom = () => {
    if (scrollTo === "unknown") {
      return;
    }

    refs[scrollTo].current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [scrollTo, scrollToCount]);

  return <Body>{getRows(securities, analytics, refs)}</Body>;
};

Macroanalysis.propTypes = {
  analytics: PropTypes.object.isRequired,
  sortKey: PropTypes.string.isRequired,
  scrollTo: PropTypes.string.isRequired,
  scrollToCount: PropTypes.number.isRequired
};

export default Macroanalysis;
