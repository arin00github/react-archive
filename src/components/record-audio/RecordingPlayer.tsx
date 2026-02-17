"use client";

import { useEffect, useRef, useState } from "react";
import { loadAudioFromDB } from "@/utils/voiceDB";
import styled from "styled-components";

const StyledRecordingPlayer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .effectBox {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .audioTitle {
    text-align: center;
    margin-top: 1.5rem;
    padding: 1rem 0;
  }

  .audioBox {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-content: center;

    .noAudio {
      animation: bounceText 2s infinite;
    }
  }

  @keyframes bounceText {
    0%,
    100% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(0.9);
    }
  }
`;

const StyledSoundWave = styled.div<{ active: string }>`
  position: relative;
  .soundWave {
    display: flex;
    gap: 6px; /* Spacing between bars */
    align-items: center;
    justify-content: center;
  }

  .bar {
    width: 6px;
    height: 36px;
    background-color: #3498db; /* Bar color */
    animation: soundWave 1s infinite; /* Animation */
    border-radius: 6px;
    animation-play-state: ${(props) =>
      props.active === "true" ? "running" : "paused"};
  }

  .bar:nth-child(1) {
    animation-delay: 0s;
  }

  .bar:nth-child(2) {
    animation-delay: 0.2s;
  }

  .bar:nth-child(3) {
    animation-delay: 0.4s;
  }

  .bar:nth-child(4) {
    animation-delay: 0.6s;
  }

  .bar:nth-child(5) {
    animation-delay: 0.8s;
  }

  .bar:nth-child(6) {
    animation-delay: 1s;
  }

  @keyframes soundWave {
    0%,
    100% {
      transform: scaleY(0.2);
    }
    50% {
      transform: scaleY(1);
    }
  }
`;

interface IRecordingPlayer {
  selectedAudioId: string | undefined;
}

const RecordingPlayer = (props: IRecordingPlayer) => {
  const { selectedAudioId } = props;
  const playerRef = useRef<HTMLAudioElement | null>(null);

  const [audioUrl, setAudioUrl] = useState<string | undefined>();
  const [audioTitle, setAudioTitle] = useState<string | undefined>();

  const loadAudioData = async (id: string) => {
    const result = await loadAudioFromDB(id);
    if (result) {
      console.log("selectedAudio data", result);
      setAudioTitle(result.id);
      const url = URL.createObjectURL(result.blob);
      setAudioUrl(url);
    }
  };

  useEffect(() => {
    if (selectedAudioId) {
      loadAudioData(selectedAudioId);
    } else {
      setAudioUrl(undefined);
      setAudioTitle(undefined);
    }
  }, [selectedAudioId]);

  return (
    <StyledRecordingPlayer>
      <div className="effectBox">
        <StyledSoundWave active={!!selectedAudioId ? "true" : "false"}>
          <div className="soundWave">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </StyledSoundWave>
      </div>
      {audioTitle && <div className="audioTitle">{audioTitle}</div>}

      <div className="audioBox">
        {audioUrl && <audio ref={playerRef} src={audioUrl} controls></audio>}
        {!audioUrl && <div className="noAudio">Select Audio Data</div>}
      </div>
    </StyledRecordingPlayer>
  );
};

export default RecordingPlayer;
