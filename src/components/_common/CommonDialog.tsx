"use client";

import { DialogStatus } from "@/interfaces/common";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  // DialogTitle,
} from "@mui/material";
import styled from "styled-components";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-root": {
    zIndex: 6000,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface IConfirmDialog {
  isOpen: boolean;
  message: string;
  status: DialogStatus;
  handleClose: () => void;
  handleConfirm?: () => void;
  btnText?: {
    confirmOK: string;
  };
  titleText?: string;
}

const CommonDialog = (props: IConfirmDialog) => {
  const {
    isOpen,
    handleClose,
    handleConfirm,
    message,
    status,
    btnText,
    titleText,
  } = props;

  return (
    <StyledDialog open={isOpen} onClose={handleClose} style={{ zIndex: 5500 }}>
      {titleText && status !== "input" && (
        <DialogTitle>{titleText}</DialogTitle>
      )}
      <DialogContent style={{ padding: "1rem 2rem" }}>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      {status === "confirm" && (
        <DialogActions
          style={{ justifyContent: "center", padding: "1.5rem 1.2rem" }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            {btnText ? btnText.confirmOK : "Okey"}
          </Button>
        </DialogActions>
      )}
      {status === "result" && (
        <DialogActions
          style={{ justifyContent: "center", padding: "1.5rem 1.2rem" }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Confirm
          </Button>
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export default CommonDialog;
