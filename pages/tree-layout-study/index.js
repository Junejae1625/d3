import * as d3 from "d3";
import { useEffect, useRef } from "react";
const mydata = {
  name: "Max",
  children: [
    {
      name: "sylvia",
      children: [
        {
          name: "craig",
          name: "robin",
          name: "anna",
        },
      ],
    },
    { name: "david", children: [{ name: "jeff", name: "buffy" }] },
  ],
};

export default function ScalesPage() {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 500;
    const height = 500;

    const canvas = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("transform", (d) => {
        return `translate (${100}, ${100})`;
      });

    const treeLayout = d3.tree().size([width, height]);

    const root = d3.hierarchy(mydata);

    const links = treeLayout(root).links();
    const linkPathGenerator = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    canvas
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", linkPathGenerator)
      .attr("fill", "none")
      .attr("stroke", "#adadad");

    canvas
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .text((d) => d.data.name);
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
