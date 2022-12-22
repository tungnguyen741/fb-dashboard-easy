import React, { useEffect, useRef, useState } from "react";
import styles from "./Loading.module.scss";
import "./Loading.scss";

export const Loading: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(10);

  useEffect(() => {
    const randomPlus = (ratio = 1) => Math.round(Math.random() * ratio);
    setTimeout(() => {
      setPercent((prev) => {
        return prev >= 80 ? prev : prev + randomPlus(prev < 80 ? 18 : 1);
      });
    }, 5);
  }, [percent]);

  useEffect(() => {
    return () => {
      if (loadingRef.current) loadingRef.current.style.transition = "0s";

      setPercent(100);
    };
  }, []);

  return (
    <div className={styles.Loading}>
      <div className="overlay">
        <div className="wrap">
          <div className="cube">
            <div className="side s1" />
            <div className="side s2" />
            <div className="side s3" />
            <div className="side s4" />
            <div className="side top" />
          </div>
        </div>
        <div className="progress-bar">
          <div className="bar">
            <div
              style={
                {
                  "--progress": `${percent}%`,
                } as React.CSSProperties
              }
              className="progress"
              ref={loadingRef}
            />
          </div>
          <p className="text">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
