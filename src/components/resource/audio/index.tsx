"use client";

import { BasicStyleLayout } from "@/components/_common/style/BasicLayout";
import { useRef, useState } from "react";
import styled from "styled-components";

const RecordBox = styled.div`
  .button {
    outline: none;
    border: none;
    color: white;
    border-radius: 8px;
    padding: 10px 18px;
    background-color: rebeccapurple;
  }
`;

const RecordContainer = () => {
  const mediaRecorder = useRef<any | null>(null);
  const [audioData, setAudioData] = useState<string | undefined>();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordProcess, setRecordProcess] = useState<string>("prepare");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!stream) {
        alert("Please chagne audio authorize true");
        return;
      }
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      const chunks: any[] = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(new Uint8Array(event.data as any));
        }
      };
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setAudioData(base64data);
        };
        setIsRecording(true);
        setRecordProcess("record");
      };
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setRecordProcess("finish");
    }
  };

  const finishRecording = () => {
    //
  };

  return (
    <div>
      <div>Audio Record Test</div>
      <RecordBox>
        {recordProcess === "prepare" && (
          <button className="button">Record Start</button>
        )}
      </RecordBox>
    </div>
  );
};

const ResourceAudioContainer = () => {
  return (
    <BasicStyleLayout>
      <RecordContainer />
    </BasicStyleLayout>
  );
};

export default ResourceAudioContainer;
