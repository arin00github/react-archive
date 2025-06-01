"use client";

import { useEffect, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
// import StopCircleIcon from "@mui/icons-material/StopCircle";
// import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import styled from "styled-components";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Stack,
  Typography,
} from "@mui/material";

const StyledStateCircle = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.custom.color.primary};
  border-radius: 5rem;
  display: flex;
  color: white;

  &.recording {
    animation: 1s ease-in infinite bounce;

    @keyframes bounce {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(0.7);
      }

      100% {
        transform: scale(1);
      }
    }
  }
`;

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecording, setHasRecording] = useState<boolean>(false);
  const [isMicAvailable, setIsMicAvailable] = useState<boolean>(false);

  const mediaRecordRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

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
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("마이크 접근 실패:", err);
    }
  };

  const stopRecording = () => {
    if (!mediaRecordRef.current) return;
    mediaRecordRef.current.stop();
    setIsRecording(false);
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
  }, []);

  return (
    <Container>
      <Box>
        <Typography>
          {isMicAvailable ? "마이크 사용 가능" : "마이크 허용 필요"}
        </Typography>
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <StyledStateCircle className={isRecording ? "recording" : ""}>
          {isRecording ? <MicIcon color="action" /> : "recording?"}
        </StyledStateCircle>
      </Box>
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
      <Stack
        p="3rem"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ButtonGroup>
          {!isRecording ? (
            <Button onClick={startRecording}>Start Recording</Button>
          ) : (
            <Button onClick={stopRecording}>Stop Recording</Button>
          )}
        </ButtonGroup>
      </Stack>
    </Container>
  );
};

export default VoiceRecorder;
