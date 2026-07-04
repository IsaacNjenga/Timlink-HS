import React from "react";
import CountUp from "react-countup";

function CountUpComponent({ value }) {
  return <CountUp end={value} start={0} duration={1} separator="," />;
}

export default CountUpComponent;
