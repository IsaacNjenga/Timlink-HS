import React from "react";
import CountUp from "react-countup";
function CountUpComponent({ value }) {
  return <CountUp end={value} start={0} duration={200}
  separator="," />;
}

export default CountUpComponent;
