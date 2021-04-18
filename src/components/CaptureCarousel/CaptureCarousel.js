import React, { useState } from "react";
import * as styles from "./CaptureCarousel.module.scss";

const CaptureCarousel = ({ captures }) => {
  const stackClass = `stack${captures.length}`;

  const [offset, setOffset] = useState(0);

  const updateOffset = (newOffset) => {
    if (typeof newOffset === undefined || newOffset === null)
      newOffset = offset + 1;
    if (newOffset > captures.length - 1) {
      newOffset = 0;
    }
    else if (newOffset < 0) {
      newOffset = captures.length - 1;
    }
    setOffset(newOffset);
  };

  const nextCapture = () => {
    const newOffset = offset + 1;
    updateOffset(newOffset);
  }

  const prevCapture = () => {
    const newOffset = offset - 1;
    updateOffset(newOffset);
  }

  return (
    <>
      <div className={styles.captureScroll}>
        <button onClick={prevCapture} className={styles.prev}>
          <span className="sr-only">Previous</span>
        </button>
        <button onClick={nextCapture} className={styles.next}>
          <span className="sr-only">Next</span>
        </button>
        <ul
          className={`${styles.captureList} ${styles[stackClass]} ${
            styles[`offset${offset}`]
          }`}
        >
          {captures.map((capture) => (
            <li>
              <figure>
                <img src={capture.file.publicURL} alt="" />
                <figcaption>{capture.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
      {captures.length > 1 && (
        <ul className={styles.buttons}>
        {captures.map((capture, index) => {
          const activeClass = index === offset ? styles.active : null;
          return (
            <li className={activeClass}>
              <button onClick={() => updateOffset(index)}>
                <img
                  src={capture.file.publicURL}
                  alt={`Jump to image ${index + 1}`}
                />
              </button>
            </li>
          );
        })}
      </ul>
      )}
    </>
  );
};

export default CaptureCarousel;
