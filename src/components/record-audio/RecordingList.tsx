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
    padding: 1.2rem;
    background-color: ${({ theme }) => theme.custom.color.alpha100};

    .audioListItem {
      cursor: pointer;
      border: 1px solid ${({ theme }) => theme.custom.color.tableBorder};
      padding: 1rem;
      background-color: ${({ theme }) => theme.custom.color.background};
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        border-color: ${({ theme }) => theme.custom.color.primary};
      }

      &.selected {
        border-color: ${({ theme }) => theme.custom.color.primary};
        color: ${({ theme }) => theme.custom.color.primary};
      }
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
  const { audioList, handleDelete, handleSelect, selectedAudioId } = props;

  return (
    <StyledRecordingList>
      <SectionHeader>Recording List</SectionHeader>
      <div className="listBox">
        {audioList?.map((data) => {
          return (
            <div
              key={data.id}
              className={`${
                selectedAudioId === data.id ? "selected" : ""
              } audioListItem`}
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
