import * as d3 from "d3";

import { useEffect, useRef } from "react";

const EnterUpdateExit = () => {
  const svgRef = useRef(null);

  // path에 경로를 설정해 주려면 d로 시작해야하며 문자열로 해야한다.

  const data = [
    { x: 10, y: 20 },
    { x: 40, y: 60 },
    { x: 50, y: 70 },
  ];

  useEffect(() => {
    const canvas = d3
      .select(svgRef.current)
      .attr("width", 500)
      .attr("height", 500);

    const group = canvas.append("g").attr("transform", "translate(100, 100)");
    const line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);
    group
      .selectAll("path")
      .data([data])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", "5");
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default EnterUpdateExit;
