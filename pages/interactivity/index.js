import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useResizeObserver } from "../hooks/useResizeObserver";

export default function InteractivityPage(props) {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!dimensions) return;

    const svg = d3.select(svgRef.current);
    const xScale = d3
      .scaleBand()
      .domain(props.data.map((_, i) => i))
      .range([0, dimensions.width]) // change
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, 150]) // todo
      .range([dimensions.height, 0]); // change
    const colorScale = d3
      .scaleLinear()
      .domain([75, 110, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    // x축을 어디에 놓을 것인지 정해줘야 함
    const xAxis = d3.axisBottom(xScale).ticks(props.data.length);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = d3.axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${dimensions.width}px)`)
      .call(yAxis);

    // on() 의 경우 transition() 선언 전에 써야함
    svg
      .selectAll(".bar")
      .data(props.data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1")
      .attr("x", (_, index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseover", (value, i) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(i) - 4))
          .attr("text-anchor", "middle")
          .attr("class", "tooltip")
          .text(i)
          .transition()
          .attr("y", yScale(i) - 8)
          .attr("opacity", 1)
          .attr("x", xScale(i) + xScale.bandwidth() / 2);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => dimensions.height - yScale(value));
  }, [props.data, dimensions]);

  return (
    <Div>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <Svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </Svg>
      </div>
      <Buttons onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </Buttons>
      <Buttons onClick={() => setData(data.map((value) => value < 35))}>
        Filter data
      </Buttons>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  height: 100vh;
  padding: 0 50px;
`;
const Svg = styled.svg`
  background-color: #ddd;
  overflow: visible;

  display: block;
  width: 100%;
`;
const Buttons = styled.button`
  width: 120px;
  margin-bottom: 1rem;
`;
