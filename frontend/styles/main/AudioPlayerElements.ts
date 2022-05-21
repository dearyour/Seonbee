import styled from '@emotion/styled';

export const AudioPlayerWidget = styled.div`
  --primary: #e9e5e1;
  --secondary: #64543e;

  align-items: center;
  display: flex;
  /* width: 400px; */
`;

export const ForwardBackward = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
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

  &:hover {
    background: #c0b4a5;
    transition: 0.3s ease;
  }
`;

export const CurrentTime = styled.div`
  font-size: 0.75rem;
  margin-left: 1rem;
  width: 2.5rem;
`;

export const Duration = styled.div`
  font-size: 0.75rem;
  width: 2.5rem;
`;

export const ProgressBar = styled.input`
  --bar-bg: var(--primary);
  --seek-before-width: 0;
  --seek-before-color: #c0b4a5;
  --knobby: #5cbab0;
  --selectedKnobby: #ff6464;

  appearance: none;
  background: var(--bar-bg);
  border-radius: 10px;
  width: 100px;
  /* width: 100%; */
  height: 10px;
  outline: none;

  ::-moz-focus-outer {
    border: 0;
  }

  ::before {
    content: '';
    height: 10px;
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
    height: 11px;
    width: 11px;
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
