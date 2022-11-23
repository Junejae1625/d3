import * as d3 from "d3";
import { useState } from "react";
import styled from "@emotion/styled";
import InteractivityPage from "../interactivity";

export default function ScalesPage() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);

  return (
    <>
      <InteractivityPage data={data} setData={setData} />
    </>
  );
}
