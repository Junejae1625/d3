import * as d3 from "d3";
import { useEffect } from "react";

export default function Tutorial() {
  useEffect(() => {
    const dataArray = [20, 40, 50];

    const canvas = d3
      .select("body")
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    const bars = canvas
      .selectAll("rect")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("width", (d) => {
        return d * 10;
      })
      .attr("height", 50)
      .attr("y", (d, i) => {
        return i * 100;
      });
  }, []);

  return <div>뭐지</div>;
}
