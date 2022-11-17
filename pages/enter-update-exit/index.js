import * as d3 from "d3";
import { useEffect, useRef } from "react";

const EnterUpdateExit = () => {
  // DOM elements < data elements (enter)
  // DOM elements > data elements (exit)
  // DOM elements = data elements (update)
  const svgRef = useRef(null);
  const data = [10];

  const aaa = () => {
    const canvas = d3
      .select(svgRef.current)
      .attr("width", 500)
      .attr("height", 500);
    // --------------- 이미 원이 존재하므로 아래에있는 circles에 원하는대로 원이 그려지지않음

    const circle1 = canvas
      .append("circle")
      .attr("cx", 50)
      .attr("cy", 100)
      .attr("r", 25);

    const circle2 = canvas
      .append("circle")
      .attr("cx", 50)
      .attr("cy", 200)
      .attr("r", 25);

    const circles = canvas
      .selectAll("circle")
      .data(data)
      .attr("fill", "green")
      .exit()
      .attr("fill", "blue");

    // ------------------
  };

  useEffect(() => {
    aaa();
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default EnterUpdateExit;
