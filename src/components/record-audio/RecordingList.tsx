"use client";

import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";

import { RecordData } from "@/interfaces/record";
import SectionHeader from "../_common/style/SectionHeader";
import { IconButton } from "@mui/material";

const StyledRecordingList = styled.div`
  width: 100%;
  .listBox {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    padding: 0.625rem;

    .audioListItem {
      cursor: pointer;
      border: 1px solid ${({ theme }) => theme.custom.color.tableBorder};
      padding: 1rem;
      background-color: ${({ theme }) => theme.custom.color.background};
    }
  }
`;

interface IRecordingList {
  audioList: RecordData[];
  selectedAudioId: string | undefined;
  handleSelect: (id: string) => void;
  handleDelete: (id: string) => void;
}

const RecordingList = (props: IRecordingList) => {
  console.log("RecordingList props", props);
  const { audioList, handleDelete, handleSelect } = props;

  return (
    <StyledRecordingList>
      <SectionHeader>Recording List</SectionHeader>
      <div className="listBox">
        {audioList?.map((data) => {
          return (
            <div
              key={data.id}
              className="audioListItem"
              onClick={() => handleSelect(data.id)}
            >
              <span>{data.id}</span>
              <IconButton onClick={() => handleDelete(data.id)}>
                <ClearIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
    </StyledRecordingList>
  );
};

export default RecordingList;
