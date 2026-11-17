import React from "react";

/* Splits text into animated letters. Pass `lines` (array) for manual line breaks. */
const SplitText = ({ text, lines }) => {
  const rows = lines || [text];
  let i = 0;
  return (
    <>
      {rows.map((row, r) => (
        <React.Fragment key={r}>
          {r > 0 && <br />}
          {row.split(" ").map((word, w, arr) => (
            <React.Fragment key={w}>
              <span className="split-word" aria-hidden="true">
                {word.split("").map((ch) => (
                  <span className="split-letter" style={{ "--i": i++ }} key={i}>
                    {ch}
                  </span>
                ))}
              </span>
              {w < arr.length - 1 ? " " : ""}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
      <span className="sr-only">{rows.join(" ")}</span>
    </>
  );
};

export default SplitText;
