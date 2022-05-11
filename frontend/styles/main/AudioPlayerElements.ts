import styled from '@emotion/styled';

export const AudioPlayerWidget = styled.div`
  --primary: #e9e5e1;
  --secondary: #64543e;

  align-items: center;
  display: flex;
  width: 500px;
`;

export const ForwardBackward = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: var(--secondary);
    /* transition: 0.3s ease; */
  }
`;

export const PlayPause = styled.button`
  background: var(--primary);
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 0.75rem;
  color: var(--secondary);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CurrentTime = styled.div`
  font-size: 1rem;
  margin-left: 5%;
`;

export const Duration = styled.div`
  font-size: 1rem;
`;

export const ProgressBar = styled.input`
  --bar-bg: #ffe3d4;
  --seek-before-width: 100px;
  --seek-before-color: #ffc2a1;
  --knobby: #3452a5;
  --selectedKnobby: #26c9c3;

  appearance: none;
  background: var(--bar-bg);
  border-radius: 10px;
  width: 100%;
  height: 11px;
  outline: none;

  ::-moz-focus-outer {
    border: 0;
  }

  ::before {
    content: '';
    height: 11px;
    width: var(--seek-before-width);
    background-color: var(--seek-before-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    /* top: 0;
    left: 0; */
    z-index: 2;
    cursor: pointer;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: none;
    background-color: var(--knobby);
    cursor: pointer;
    position: relative;
    /* margin: -2px 0 0 0; */
    z-index: 3;
    box-sizing: border-box;
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: var(--selectedKnobby);
  }
`;
