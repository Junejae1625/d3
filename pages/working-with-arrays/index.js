import * as d3 from "d3";
import { useEffect, useRef } from "react";

const WorkingWithArrays = () => {
  const svgRef = useRef(null);

  const data = [10, 20, 30, 40, 50];

  // data.sort(d3.descending)  -> 내림차순
  // d3.min(data)  -> 최솟값
  // d3.max(data)  -> 최대값
  // d3.extent(data)  -> 범위 [10, 50]
  // d3.sum(data)  -> 합계  150
  // d3.mean(data)  -> 평균 30
  // d3.median(data) -> 중앙값 30
  // d3.shuffle(data) . -> 랜덤으로 섞기
  data.sort(d3.descending);

  console.log(d3.shuffle(data));
  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default WorkingWithArrays;
