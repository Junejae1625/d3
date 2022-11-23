import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const Svg = styled.svg`
  background-color: #ddd;
  overflow: visible;
`;
const Div = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function ScalesPage() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const xScale = d3
      .scaleBand()
      .domain(data.map((_, i) => i))
      .range([0, 300])
      .padding(0.5);

    const yScale = d3.scaleLinear().domain([0, 150]).range([150, 0]);

    const colorScale = d3
      .scaleLinear()
      .domain([75, 110, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    // x축을 어디에 놓을 것인지 정해줘야 함
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = d3.axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")

      .style("transform", "scale(1, -1")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => 150 - yScale(value));
  }, [data]);

  return (
    <Div>
      <Svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </Svg>

      <br />
      <br />
      <br />
      <br />
      <div>
        <button onClick={() => setData(data.map((value) => value + 5))}>
          Update data
        </button>
        <button onClick={() => setData(data.map((value) => value < 35))}>
          Filter data
        </button>
      </div>
    </Div>
  );
}
