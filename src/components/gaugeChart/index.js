import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../../hooks/useResizeObserver";
export default function GaugeChartPage({ data }) {
  const svgRef = useRef(null);
  const divRef = useRef(null);
  const dimensions = useResizeObserver(divRef);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    if (!dimensions) return;

    const arcGenerator = d3.arc().innerRadius(75).outerRadius(150);

    const pieGenerator = d3.pie();
    const instructions = pieGenerator(data);

    svg
      .selectAll(".slice")
      .data(instructions)
      .join("path")
      .attr("class", "slice")
      .attr("stroke", "black")
      .attr("fill", "none")
      .style(
        "transform",
        `translate(${dimensions.width / 2}px, ${dimensions.height}px)`
      )
      .attr("d", (instructions) => arcGenerator(instructions));
  }, [data, dimensions]);

  return (
    <div
      style={{
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "stretch",
        alignItems: "center",
        height: "80vh",
        width: "100%",
      }}
    >
      <h1>인공지능 신기해</h1>
      <small>
        [{data[0].toFixed(2)}, {data[1].toFixed(2)}]
      </small>
      <div ref={divRef}>
        <svg ref={svgRef} style={{ overflow: "visible", width: "100%" }}></svg>
      </div>
    </div>
  );
}
