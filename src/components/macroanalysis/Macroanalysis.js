import React from "react";
import styled from "styled-components";

import Row from "./row/Row";

const securities = ["Bitcoin", "Ethereum", "Litecoin", "Bitcoin Cash", "Dogecoin"];

const Body = styled.div`
  display: grid;
  width: 100%;
  overflow: scroll;
`;

const rows = securities.map((security) => <Row key={security} security={security} />);

const Macroanalysis = () => {
  return <Body>{rows}</Body>;
};

export default Macroanalysis;
