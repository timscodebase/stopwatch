import styled from "styled-components";
const StyledStopwatch = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: grid;
  place-items: center;

  .wrapper {
    width: 42%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6rem;
  }

  .numbers {
    width: 100%;
  }

  .buttons {
    width: 55%;
    padding-top: 2rem;
  }

  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 6rem;
  }

  /* .audio-element {
    display: none;
  } */
`;

export default StyledStopwatch;
