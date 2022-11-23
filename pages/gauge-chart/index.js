import { useEffect, useRef, useState } from "react";
import GaugeChartPage from "../../src/components/gaugeChart";
// import ml5 from "ml5";
import useInterval from "../../src/hooks/useInterval";

let classifier;
export default function GaugeChart() {
  const videoRef = useRef(null);
  const [data, setData] = useState([0.5, 0.5]);
  const [shouldClassify, setShouldClassify] = useState(false);
  useEffect(() => {
    const qqq = async () => {
      const ml5 = await import("ml5");
      classifier = ml5.imageClassifier("/machine-model/model.json", () => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          });
      });
    };
    qqq();
  }, []);
  useEffect(() => {
    if (!shouldClassify) return;
    setInterval(() => {
      console.log(classifier);
      console.log(shouldClassify);
      if (classifier && shouldClassify) {
        classifier.classify(videoRef.current, (error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          results.sort((a, b) => b.label.localeCompare(a.label));
          console.log(results);
          setData(results.map((el) => el.confidence));
        });
      }
    }, 500);
  }, [shouldClassify]);

  return (
    <div>
      <GaugeChartPage data={data} />
      <button onClick={() => setShouldClassify(!shouldClassify)}>
        {shouldClassify ? "기록중" : "정지중"}
      </button>
      <video
        ref={videoRef}
        style={{ transform: "scale(-1,1)" }}
        width="300"
        height="150"
      />
    </div>
  );
}
