import * as d3 from "d3";

import { useEffect, useRef } from "react";

const EnterUpdateExit = () => {
  const svgRef = useRef(null);

  // path에 경로를 설정해 주려면 d로 시작해야하며 문자열로 해야한다.

  const data = [10, 50, 80];
  const r = 300;

  const color = d3.scaleOrdinal().range(["red", "blue", "orange"]);

  useEffect(() => {
    const canvas = d3
      .select(svgRef.current)
      .attr("width", 1500)
      .attr("height", 1500);

    const group = canvas.append("g").attr("transform", "translate(300, 300)");

    const arc = d3.arc().innerRadius(0).outerRadius(r);

    const pie = d3.pie();

    const arcs = group
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    console.log(pie(data));

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data));

    arcs
      .append("text")
      .attr("transform", (d) => {
        return `translate(${arc.centroid(d)})`;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "1.5rem")
      .text((d) => d.data);
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default EnterUpdateExit;
