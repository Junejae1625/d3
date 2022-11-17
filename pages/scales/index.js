import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function ScalesPage() {
  const svgRef = useRef(null);
  // scales는 svg의 크기보다 더 큰 값이 들어왔을때 늘려주는 메서드,색깔도 스케일 가능

  useEffect(() => {
    const dataArray = [10, 40, 50, 60];

    const width = 500;
    const height = 500;

    const widthScale = d3.scaleLinear().domain([0, 60]).range([0, width]);
    const color = d3.scaleLinear().domain([0, 60]).range(["red", "blue"]);
    const canvas = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const bars = canvas
      .selectAll("rect")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("width", (d) => {
        return widthScale(d);
      })
      .attr("height", 50)
      .attr("y", (d, i) => {
        return i * 100;
      })
      .attr("fill", (d) => {
        return color(d);
      });
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
