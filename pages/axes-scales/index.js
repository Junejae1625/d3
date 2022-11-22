import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const Svg = styled.svg`
  background-color: #eee;
  overflow: visible;
`;

export default function ScalesPage() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = d3.scaleLinear().domain([0, 150]).range([150, 0]);

    // x축을 어디에 놓을 것인지 정해줘야 함
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = d3.axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);
    const myLine = d3
      .line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(d3.curveCardinal);

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <div>
      <Svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </Svg>

      <br />
      <br />
      <br />
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
