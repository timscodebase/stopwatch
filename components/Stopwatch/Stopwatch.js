import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRedo,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useInterval } from "../../hooks/useInterval";
import StyledStopwatch from "./StyledStopwatch";

export default function Stopwatch({ percentage, setPercentage }) {
  const [started, setStarted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [startingMS, setStartingMS] = useState(0);

  useInterval(
    () => {
      setMilliseconds(milliseconds - 100);
      setTime(milliseconds);
      setPercentage(((startingMS - milliseconds) / startingMS) * 100);

      if (milliseconds < 1) {
        const ding = document.getElementsByClassName("audio-element")[0];
        playAudio();
        pause();
      }
    },
    started ? 100 : null
  );

  function setTime(ms) {
    let seconds = ms / 1000;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;

    if (hours <= 0) {
      setHours("00");
    }
    if (minutes <= 0) {
      setMinutes("00");
    }
    if (seconds <= 0) {
      setSeconds("00");
    }

    setHours(Math.floor(hours));
    setMinutes(Math.floor(minutes));
    setSeconds(Math.floor(seconds));
  }

  function playAudio() {
    const ding = document.getElementsByClassName("audio-element")[0];
    ding.play();
  }

  function increaseHours() {
    setHours(hours + 1);
    setMilliseconds(milliseconds + 3600000);
  }
  function decreaseHours() {
    setHours(hours - 1);
    setMilliseconds(milliseconds - 3600000);
  }

  function increaseMinutes() {
    setMinutes(minutes + 1);
    setMilliseconds(milliseconds + 60000);
  }
  function decreaseMinutes() {
    setMinutes(minutes - 1);
    setMilliseconds(milliseconds - 60000);
  }

  function increaseSeconds() {
    setSeconds(seconds + 1);
    setMilliseconds(milliseconds + 1000);
    console.log(milliseconds);
  }
  function decreaseSeconds() {
    setSeconds(seconds - 1);
    setMilliseconds(milliseconds - 1000);
  }

  function start() {
    if (!hasStarted) {
      setStartingMS(milliseconds);
    }
    setStarted(true);
    setHasStarted(true);
  }
  function pause() {
    setStarted(false);
  }
  function reset() {
    pause();
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    setHasStarted(true);
  }

  return (
    <StyledStopwatch>
      <audio className="audio-element">
        <source src="/ding.mp3"></source>
      </audio>
      <div className="wrapper">
        <div className="flex numbers">
          <section>
            <button disabled={started || hours >= 99} onClick={increaseHours}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {hours < 10 ? `0${hours}` : hours}
            <button disabled={started || hours <= 0} onClick={decreaseHours}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </section>
          :
          <section>
            <button
              disabled={started || minutes >= 60}
              onClick={increaseMinutes}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {minutes < 10 ? `0${minutes}` : minutes}
            <button
              disabled={started || minutes <= 0}
              onClick={decreaseMinutes}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </section>
          :
          <section>
            <button
              disabled={started || seconds >= 60}
              onClick={increaseSeconds}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {seconds < 10 ? `0${seconds}` : seconds}
            <button
              disabled={started || seconds <= 0}
              onClick={decreaseSeconds}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </section>
        </div>

        <div className="flex buttons">
          <button onClick={reset}>
            <FontAwesomeIcon icon={faRedo} />
          </button>
          <button onClick={started ? pause : start}>
            {started ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
        </div>
      </div>
    </StyledStopwatch>
  );
}
