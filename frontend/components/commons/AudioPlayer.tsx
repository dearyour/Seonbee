import React, { useState, useRef, useEffect } from "react";
import Arche from "public/music/Arche.mp3";
import {
  AudioPlayerWidget,
  ForwardBackward,
  PlayPause,
  CurrentTime,
  Duration,
  ProgressBar,
} from "styles/main/AudioPlayerElements";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsPlayFill,
  BsPauseFill,
} from "react-icons/bs";
import { FaPlay, FaPause } from "react-icons/fa";

function AudioPlayer() {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number | null>(null);

  // useEffect(() => {
  //   if (isPlaying) {
  //     console.log('isPlaying', isPlaying);

  //     audioPlayer.current?.play();
  //   } else {
  //     console.log('isPlaying', isPlaying);

  //     audioPlayer.current?.pause();
  //   }
  //   console.log('isPlaying', isPlaying);
  // }, [isPlaying]);

  useEffect(() => {
    // console.log("audioPlayer.current", audioPlayer.current);
    if (audioPlayer.current) {
      audioPlayer.current.volume = 0.1;

      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      if (progressBar.current) {
        progressBar.current.max = seconds.toString();
      }
    }
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  useEffect(() => {
    if (currentTime == duration) {
      // togglePlayPause();
      if (progressBar.current) progressBar.current.value = "0";
      changeRange();
    }
  }, [currentTime]);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    if (audioPlayer.current?.currentTime !== undefined && progressBar.current)
      progressBar.current.value = audioPlayer.current?.currentTime.toString();
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = Number(progressBar.current?.value);
      // console.log(audioPlayer.current.currentTime, duration);

      changePlayerCurrentTime();
    }
  };

  const changePlayerCurrentTime = () => {
    progressBar.current?.style.setProperty(
      "--seek-before-width",
      `${(Number(progressBar.current.value) / duration) * 100}px`
    );
    setCurrentTime(Number(progressBar.current?.value));
  };

  const backTen = () => {
    if (progressBar.current) {
      progressBar.current.value = (
        Number(progressBar.current.value) - 10
      ).toString();
      changeRange();
    }
  };

  const forwardTen = () => {
    if (progressBar.current) {
      progressBar.current.value = (
        Number(progressBar.current.value) + 10
      ).toString();
      changeRange();
    }
  };

  return (
    <AudioPlayerWidget>
      <audio ref={audioPlayer} src={"Arche"} preload="metadata" />
      <ForwardBackward onClick={backTen}>
        <BsArrowLeftShort /> 10
      </ForwardBackward>
      <PlayPause onClick={togglePlayPause}>
        {isPlaying ? (
          <FaPause />
        ) : (
          <FaPlay style={{ position: "relative", left: "1px" }} />
        )}
      </PlayPause>
      <ForwardBackward onClick={forwardTen}>
        10
        <BsArrowRightShort />
      </ForwardBackward>

      {/* current time */}
      {/* <CurrentTime>{calculateTime(currentTime)}</CurrentTime> */}

      {/* progress bar */}

      <ProgressBar
        type="range"
        defaultValue={0}
        ref={progressBar}
        onChange={changeRange}
      />

      {/* duration */}
      {/* <Duration>
          {duration && !isNaN(duration) && calculateTime(duration)}
        </Duration> */}
    </AudioPlayerWidget>
  );
}

export default AudioPlayer;
