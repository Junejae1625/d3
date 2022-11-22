import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function ScalesPage() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const myLine = d3
      .line()
      .x((value, index) => index * 50)
      .y((value, index) => 150 - value)
      .curve(d3.curveCardinal);
    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("r", (value) => value)
    //   .attr("cx", (value) => value * 2)
    //   .attr("cy", (value) => value * 2)
    //   .attr("stroke", "red");

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (value) => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}>
        <path d="M0, 150, 100, 100, 150, 120" stroke="blue" fill="none" />
      </svg>
      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.map((value) => value < 35))}>
        Filter data
      </button>
    </div>
  );
}
