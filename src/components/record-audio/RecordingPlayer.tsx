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

  .audioBox {
    width: 100%;
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-content: center;
  }
`;

const StyledSoundWave = styled.div`
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

  const loadAudioData = async (id: string) => {
    const result = await loadAudioFromDB(id);
    console.log("result", result);
    if (result) {
      const url = URL.createObjectURL(result.blob);
      setAudioUrl(url);
    }
  };

  useEffect(() => {
    if (selectedAudioId) {
      loadAudioData(selectedAudioId);
    }
  }, [selectedAudioId]);

  console.log("audioUrl", audioUrl);

  return (
    <StyledRecordingPlayer>
      <div className="effectBox">
        <StyledSoundWave>
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
      <div className="audioBox">
        {audioUrl && <audio ref={playerRef} src={audioUrl} controls></audio>}
      </div>
    </StyledRecordingPlayer>
  );
};

export default RecordingPlayer;
