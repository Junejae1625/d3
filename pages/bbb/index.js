import { createElement, useEffect, useRef } from "react";

export default function Tutorial() {
  const divRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const input = document.querySelector("input");
    const preview = document.querySelector(".file_list");

    input.addEventListener("change", showTextFile);

    function showTextFile() {
      const selectedFiles = input.files;
      const list = document.createElement("ul");
      preview.appendChild(list);

      for (const file of selectedFiles) {
        if (file.webkitRelativePath.includes("git")) continue;
        // if (file.webkitRelativePath.includes("ts")) continue;
        // if (file.webkitRelativePath.includes("public/")) continue;
        const listItem = document.createElement("li");
        const summary = document.createElement("div");

        summary.textContent = file.webkitRelativePath;

        listItem.appendChild(summary);
        list.appendChild(listItem);
      }
    }
  }, []);

  return (
    <div>
      <div>프로젝트</div>
      <input ref={inputRef} type="file" webkitdirectory={"true"} multiple />
      <div ref={divRef} className="file_list">
        <p></p>
      </div>
    </div>
  );
}
