import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { useResizeObserver } from "../../src/hooks/useResizeObserver";

export default function ScalesPage() {
  const svgRef = useRef(null);
  const divRef = useRef(null);
  const dimensions = useResizeObserver(divRef);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    if (!dimensions) return;
  }, [dimensions]);

  // useEffect(() => {
  //   window.addEventListener("mousemove", (e) => {
  //     setClientX(e.clientX);
  //     setClientY(e.clientY);
  //   });
  // }, [clientX, clientY]);
  const mouseMove = (e) => {
    setClientX(e.clientX);
    setClientY(e.clientY);
  };
  return (
    <div ref={divRef} onMouseMove={mouseMove}>
      <svg ref={svgRef}></svg>
      <div>{clientX} </div>
      <div>{clientY} </div>
    </div>
  );
}
