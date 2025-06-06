"use client";

import styled from "styled-components";
import VoiceRecorder from "./VoiceRecorder";
import RecordingList from "./RecordingList";
import { useEffect, useState } from "react";
import { loadAllAudiosFormDB } from "@/utils/voiceDB";
import { RecordData } from "@/interfaces/record";

const StyledAudioContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  margin-top: 6rem;
  padding: 0 3rem;

  .voiceRecorder {
    width: 60%;
  }
  .recordingList {
    width: 40%;
  }
`;

const RecordAudioContainer = () => {
  const [audioList, setAudioList] = useState<RecordData[]>([]);
  const [selectedAudioId, setSelectedAudioId] = useState<string | undefined>();

  const handleSaveAudio = (id: string) => {
    setSelectedAudioId(id);
  };

  const loadAll = async () => {
    const audios = await loadAllAudiosFormDB();
    console.log("loaded audios", audios);
    setAudioList(audios);
  };

  const handleDeleteFromDB = (id: string) => {
    //
    console.log("delete target id", id);
  };

  const handleSelect = (id: string) => {
    setSelectedAudioId(id);
  };

  useEffect(() => {
    loadAll();
  }, []);

  console.log("RecordAudioContainer", audioList);

  return (
    <StyledAudioContainer>
      <div className="voiceRecorder">
        <VoiceRecorder handleSave={handleSaveAudio} />
      </div>
      <div className="recordingList">
        <RecordingList
          audioList={audioList}
          handleDelete={handleDeleteFromDB}
          handleSelect={handleSelect}
          selectedAudioId={selectedAudioId}
        />
      </div>
    </StyledAudioContainer>
  );
};

export default RecordAudioContainer;
