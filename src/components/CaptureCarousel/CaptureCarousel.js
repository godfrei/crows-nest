import React, { useState } from "react";
import * as styles from './CaptureCarousel.module.scss';

const CaptureCarousel = ({ captures }) => {
    const stackClass = `stack${captures.length}`;

    const [offset, setOffset] = useState(0);

    const updateOffset = (newOffset) => {
        if(typeof newOffset === undefined || newOffset === null) 
            newOffset = offset + 1;
        if(newOffset > captures.length - 1) {
            setOffset(0);
        }
        setOffset(newOffset);
    }

    return (
        <>
            <div className={styles.captureScroll}>
                <ul className={`${styles.captureList} ${styles[stackClass]} ${styles[`offset${offset}`]}`}>
                    {
                        captures.map(capture =>
                        <li>
                            <img src={capture.file.publicURL} />
                            <p>{capture.caption}</p>
                        </li>
                        )
                    }
                </ul>
            </div>
            <ul className={styles.buttons}>
                {
                    captures.map((capture, index) => {
                        return (
                            <li>
                                <button onClick={() => updateOffset(index)}>
                                    <img src={capture.file.publicURL} alt={`Jump to image ${index + 1}`} />
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CaptureCarousel;