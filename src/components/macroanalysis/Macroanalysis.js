import React from "react";

import PerformanceStamp from "../stamps/performance/PerformanceStamp";
import { series } from "../stamps/sample-data";

const Macroanalysis = () => {
  return (
    <div>
      <div>Macroanalysis - rows of tiles for different securities</div>
      <PerformanceStamp value={5.96} data={series} />
    </div>
  );
};

export default Macroanalysis;
