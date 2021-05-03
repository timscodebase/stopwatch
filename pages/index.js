import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import styled from "styled-components";

import Stopwatch from "../components/Stopwatch/Stopwatch";

const Percentage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: grid;
  place-items: center;

  .wrapper {
    width: 98vh;
  }
`;

export default function Home() {
  const [percentage, setPercentage] = useState(0);

  return (
    <div className={styles.container}>
      <Percentage>
        <div className="wrapper">
          <CircularProgressbar
            value={percentage}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "16px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `rgba(157, 255, 0, ${percentage / 100})`,
              textColor: "#f88",
              trailColor: "#d6d6d6",
              backgroundColor: "#48ff00",
            })}
          />
        </div>
      </Percentage>

      <Stopwatch percentage={percentage} setPercentage={setPercentage} />
    </div>
  );
}
