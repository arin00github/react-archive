"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { loadAllAudiosFormDB } from "@/utils/voiceDB";
import { RecordData } from "@/interfaces/record";

import VoiceRecorder from "./VoiceRecorder";
import RecordingList from "./RecordingList";
import RecordingPlayer from "./RecordingPlayer";

const StyledAudioContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 4rem;
  //margin-top: 6rem;
  padding: 0 3rem;
  justify-content: center;
  align-items: center;

  .voiceRecorder {
    width: 55%;
    min-height: 60%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    .navHeader {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: flex-end;

      .navChevron {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }

    .functionBox {
      height: auto;
    }
  }
  .recordingList {
    width: 45%;
    min-height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

type SectionType = "record" | "audio";

const RecordAudioContainer = () => {
  const [audioList, setAudioList] = useState<RecordData[]>([]);
  const [selectedAudioId, setSelectedAudioId] = useState<string | undefined>();
  const [section, setSection] = useState<SectionType>("record");

  const handleSaveAudio = async (id: string) => {
    await loadAll();
    setSection("audio");
    setSelectedAudioId(id);
  };

  const loadAll = async () => {
    const audios = await loadAllAudiosFormDB();
    console.log("loaded audios", audios);
    setAudioList(audios);
  };

  const handleDeleteFromDB = (id: string) => {
    console.log("delete target id", id);
  };

  const handleSelect = (id: string) => {
    setSelectedAudioId(id);
    setSection("audio");
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <StyledAudioContainer>
      <div className="voiceRecorder">
        <div className="navHeader">
          {section === "audio" ? (
            <div
              className="navChevron"
              onClick={() => {
                setSection("record");
                setSelectedAudioId(undefined);
              }}
            >
              <ChevronLeftIcon /> New Recording
            </div>
          ) : (
            <div
              className="navChevron"
              onClick={() => {
                setSection("audio");
                if (audioList.length > 0) {
                  setSelectedAudioId(audioList[0].id);
                }
              }}
            >
              Recording Play <ChevronRightIcon />
            </div>
          )}
        </div>
        <div className="functionBox">
          {section === "audio" ? (
            <RecordingPlayer selectedAudioId={selectedAudioId} />
          ) : (
            <VoiceRecorder handleSave={handleSaveAudio} />
          )}
        </div>
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
