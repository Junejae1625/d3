import { useEffect, useRef, useState } from "react";
import GaugeChartPage from "../../src/components/gaugeChart";
// import { ml5 } from "ml5";
import useInterval from "../../src/hooks/useInterval";

export default function GaugeChart() {
  const videoRef = useRef(null);
  const [data, setData] = useState([0.5, 0.5]);
  const [shouldClassify, setShouldClassify] = useState(false);
  let classifier;
  useEffect(() => {
    const ml5 = require("ml5");
    classifier = ml5.imageClassifier("/machine-model/metadata.json", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        });
    });
    console.log(classifier);
  }, []);
  useEffect(() => {
    console.log(classifier);
    setInterval(() => {
      if (classifier && shouldClassify) {
        classifier.classify(videoRef.current, (error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          results.sort((a, b) => b.label.localeCompare(a.label));
          setData(results.map((el) => el.confidnece));
        });
      }
    }, 500);
  }, []);

  return (
    <div>
      <GaugeChartPage data={data} />
      <button onClick={() => setShouldClassify(!shouldClassify)}>start</button>
      <video
        ref={videoRef}
        style={{ transform: "scale(-1,1)" }}
        width="300"
        height="150"
      />
    </div>
  );
}
