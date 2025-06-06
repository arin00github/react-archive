"use client";

import styled from "styled-components";
import VoiceRecorder from "./VoiceRecorder";
import RecordingList from "./RecordingList";

const StyledAudioContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  padding-top: 6rem;

  .voiceRecorder {
    width: 60%;
  }
  .recordingList {
    width: 40%;
  }
`;

const RecordAudioContainer = () => {
  return (
    <StyledAudioContainer>
      <div className="voiceRecorder">
        <VoiceRecorder />
      </div>
      <div className="recordingList">
        <RecordingList />
      </div>
    </StyledAudioContainer>
  );
};

export default RecordAudioContainer;
