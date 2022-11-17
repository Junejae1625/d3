import * as d3 from "d3";
import { useEffect, useRef } from "react";

const EnterUpdateExit = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const canvas = d3
      .select(svgRef.current)
      .attr("width", 500)
      .attr("height", 500);

    const circle = canvas
      .append("circle")
      .attr("cx", 50)
      .attr("cy", 100)
      .attr("r", 25);

    // circle.transition().duration(1500).delay(1000).attr("cy", 150);
    // circle
    //   .transition()
    //   .duration(1500)
    //   .attr("cx", 150)
    //   .transition()
    //   .attr("cy", 150)
    //   .transition()
    //   .attr("cx", 50);
    circle.transition().duration(1500).attr("cx", 150);
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default EnterUpdateExit;
