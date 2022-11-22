import * as d3 from "d3";

import { useEffect, useRef } from "react";

const EnterUpdateExit = () => {
  const svgRef = useRef(null);

  // path에 경로를 설정해 주려면 d로 시작해야하며 문자열로 해야한다.

  const data = [
    { x: 10, y: 20 },
    { x: 40, y: 60 },
    { x: 50, y: 70 },
  ];

  useEffect(() => {
    const canvas = d3
      .select(svgRef.current)
      .attr("width", 500)
      .attr("height", 500);

    // arc()에는 4개의 메서드가 있음
    // innerRadius 내부 반지름
    // outerRadius 외부 반지름
    // startAngle 시작 각도
    // endAngle 종료각도
    const r = 100;
    const p = Math.PI * 2;

    const group = canvas.append("g").attr("transform", "translate(200, 200)");

    const arc = d3
      .arc()
      .innerRadius(r - 50)
      .outerRadius(r)
      .startAngle(0)
      .endAngle(p - 2);
    group.append("path").attr("d", arc).attr("fill", "hotpink");
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default EnterUpdateExit;
