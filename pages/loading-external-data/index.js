import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function Tutorial() {
  const svgRef = useRef(null);
  const inputRef = useRef(null);

  const data = [
    { name: "Maria", age: 30 },
    { name: "Fred", age: 50 },
    { name: "Bob", age: 12 },
  ];

  useEffect(() => {
    const canvas = d3
      .select(svgRef.current)
      .attr("width", 500)
      .attr("height", 500);

    canvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", (d) => d.age * 10)
      .attr("height", 48)
      .attr("y", (d, i) => i * 50)
      .attr("fill", "blue");

    canvas
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("fill", "white")
      .attr("y", (d, i) => i * 50 + 24)
      .text((d) => d.name);
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div>프로젝트</div>
      <input type="file" ref={inputRef} webkitdirectory={"true"} multiple />
    </div>
  );
}
