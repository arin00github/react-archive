"use client";

import styled from "styled-components";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { RecordData } from "@/interfaces/record";

const StyledRecordingList = styled.div`
  width: 100%;

  h4 {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.custom.color.text};
    font-weight: 500;
  }
  .listBox {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.custom.color.alpha100};

    .audioListItem {
      cursor: pointer;
      border-radius: 0.325rem;
      border: 1px solid ${({ theme }) => theme.custom.color.tableBorder};
      padding: 1rem;
      background-color: ${({ theme }) => theme.custom.color.background};
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        border-color: ${({ theme }) => theme.custom.color.primary};
        color: ${({ theme }) => theme.custom.color.primary};
      }

      &.selected {
        border-color: ${({ theme }) => theme.custom.color.primary};
        color: ${({ theme }) => theme.custom.color.primary};
      }
    }

    &.empty {
      justify-content: center;
      align-items: center;
      min-height: 40rem;
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
  const { audioList, handleDelete, handleSelect, selectedAudioId } = props;

  return (
    <StyledRecordingList>
      <h4>Recording List</h4>
      {audioList.length > 0 ? (
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
      ) : (
        <div className="listBox empty">
          <div>녹음한 음성이 없습니다.</div>
        </div>
      )}
    </StyledRecordingList>
  );
};

export default RecordingList;
