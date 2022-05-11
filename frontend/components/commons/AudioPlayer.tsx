import React, { useState } from 'react';
import Arche from 'public/music/Arche.mp3';
import {
  AudioPlayerWidget,
  ForwardBackward,
  PlayPause,
  CurrentTime,
  Duration,
  ProgressBar,
} from 'styles/main/AudioPlayerElements';
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsPlayFill,
  BsPauseFill,
} from 'react-icons/bs';
import { FaPlay, FaPause } from 'react-icons/fa';

type Props = {};

function AudioPlayer({}: Props) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioPlayerWidget>
      <audio src={Arche} preload="metadata" />
      <ForwardBackward>
        <BsArrowLeftShort /> 30
      </ForwardBackward>
      <PlayPause onClick={togglePlayPause}>
        {isPlaying ? (
          <FaPause />
        ) : (
          <FaPlay style={{ position: 'relative', left: '1px' }} />
        )}
      </PlayPause>
      <ForwardBackward>
        30
        <BsArrowRightShort />
      </ForwardBackward>

      {/* current time */}
      <CurrentTime>0:00</CurrentTime>

      {/* progress bar */}
      <div>
        <ProgressBar type="range" />
      </div>

      {/* duration */}
      <Duration>2:43</Duration>
    </AudioPlayerWidget>
  );
}

export default AudioPlayer;
