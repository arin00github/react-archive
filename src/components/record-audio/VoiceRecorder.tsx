"use client";

import { useEffect, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import PauseIcon from "@mui/icons-material/Pause";
// import StopCircleIcon from "@mui/icons-material/StopCircle";
// import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import styled from "styled-components";
import { Box, Container, Typography } from "@mui/material";

const StyledRecorder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .timer {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.custom.color.text};
  }
  .desc {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.custom.color.text100};
  }

  .circleBtn {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.custom.color.text100};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const getDisplaySeceond = (val: number) => {
  if (val >= 10) {
    return `00:${val}`;
  } else {
    return `00:0${val}`;
  }
};

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecording, setHasRecording] = useState<boolean>(false);
  const [isMicAvailable, setIsMicAvailable] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  const mediaRecordRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecordRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecording(true);
        clearTimer();
      };
      mediaRecorder.start();
      setIsRecording(true);
      setSeconds(0);
      startTimer();
    } catch (err) {
      console.error("마이크 접근 실패:", err);
    }
  };

  const stopRecording = () => {
    if (!mediaRecordRef.current) return;
    mediaRecordRef.current.stop();
    setIsRecording(false);
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev + 1 >= 60) {
          stopRecording();
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const checkMicAvailability = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setIsMicAvailable(true);
    } catch (err) {
      setIsMicAvailable(false);
      console.error(err);
    }
  };

  useEffect(() => {
    checkMicAvailability();
    return () => clearTimer();
  }, []);

  return (
    <Container>
      <Box>
        <Typography>
          {isMicAvailable ? "마이크 사용 가능" : "마이크 허용 필요"}
        </Typography>
      </Box>
      <StyledRecorder>
        <div className="timer">{getDisplaySeceond(seconds)}</div>
        <div className="desc">Record duration is limited: 1 minute</div>
        {isRecording ? (
          <button className="circleBtn" onClick={stopRecording}>
            <PauseIcon color="action" />
          </button>
        ) : (
          <button className="circleBtn" onClick={startRecording}>
            <MicIcon color="action" />
          </button>
        )}
      </StyledRecorder>
      {hasRecording && audioUrl && (
        <Box
          p="3rem"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <audio ref={audioPlayerRef} controls src={audioUrl}></audio>
        </Box>
      )}
    </Container>
  );
};

export default VoiceRecorder;
