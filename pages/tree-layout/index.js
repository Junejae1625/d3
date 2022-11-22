import * as d3 from "d3";
import { useEffect, useRef } from "react";
const mydata = {
  name: "Max",
  children: [
    {
      name: "sylvia",
      children: [{ name: "craig", name: "robin", name: "anna" }],
    },
    { name: "david", children: [{ name: "jeff", name: "buffy" }] },
  ],
};

export default function ScalesPage() {
  const svgRef = useRef(null);

  useEffect(() => {
    const canvas = d3
      .select(svgRef.current)
      .attr("width", 500)
      .attr("height", 500);

    const treemap = d3.tree().size([400, 400]);
    let nodes = d3.hierarchy(mydata, (d) => d.children);
    nodes = treemap(nodes);
    const links = d3.link(d3.curveBasis);
    console.log(links);
    const node = canvas
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => {
        return `translate (${d.y}, ${d.x})`;
      });
    node.append("circle").attr("r", 5).attr("fill", "blue");
    node.append("text").text((d) => d.name);
    const diagonal = d3.link(d3.curveBasis);
    canvas
      .selectAll(".link")
      .data(nodes)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "noe")
      .attr("stroke", "#ADADAD")
      .attr("d", diagonal);
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
