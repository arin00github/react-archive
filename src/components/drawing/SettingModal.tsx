"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import styled from "styled-components";

const StyledModalContainer = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  width: 28rem;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.custom.color.background};
`;

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-root": {
    zIndex: 6000,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface ISettingModal {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: (val: {
    fileName: string;
    fileType: string;
    bgColor: string;
  }) => void;
}

const SettingModal = (props: ISettingModal) => {
  const { isOpen, handleClose, handleSave } = props;

  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("png");
  const [bgColor, setBgColor] = useState<string>("#ffffff");

  const handleFileName = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(() => e.target.value);
  };

  const handleFileType = (_: unknown, val: string) => {
    setFileType(val);
  };

  const handleBgColor = (_: unknown, val: string) => {
    setBgColor(val);
  };

  const resetForm = () => {
    setFileName("");
    setBgColor("transparent");
    setFileType("png");
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <StyledDialog open={isOpen} onClose={handleClose} style={{ zIndex: 5500 }}>
      <StyledModalContainer>
        <FormGroup>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>File Name</FormLabel>
              <Input
                placeholder="Please type the image name."
                value={fileName}
                onChange={handleFileName}
              />
            </FormControl>
            <FormControl>
              <FormLabel>File Type</FormLabel>
              <RadioGroup
                id="save-file-type"
                value={fileType}
                onChange={handleFileType}
              >
                <FormControlLabel label="png" value="png" control={<Radio />} />
                <FormControlLabel
                  label="jpeg"
                  value="jpeg"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Background Color</FormLabel>
              <RadioGroup
                id="save-background"
                value={bgColor}
                onChange={handleBgColor}
              >
                <FormControlLabel
                  label="Transparent"
                  value="transparent"
                  control={<Radio />}
                />
                <FormControlLabel
                  label="White"
                  value="#ffffff"
                  control={<Radio />}
                />
                <FormControlLabel
                  label="Black"
                  value="#000000"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </FormGroup>
        <DialogActions
          style={{ justifyContent: "center", padding: "1.5rem 1.2rem" }}
        >
          <Stack direction="row" gap=".5rem">
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleSave({ fileName, fileType, bgColor });
              }}
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </StyledModalContainer>
    </StyledDialog>
  );
};

export default SettingModal;
