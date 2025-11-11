"use client";

import { DialogStatus } from "@/interfaces/common";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
}

const CommonDialog = (props: IConfirmDialog) => {
  const { isOpen, handleClose, handleConfirm, message, status } = props;

  return (
    <StyledDialog open={isOpen} onClose={handleClose} style={{ zIndex: 5500 }}>
      {/* <DialogTitle>Confirm</DialogTitle> */}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      {status === "confirm" && (
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>OK</Button>
        </DialogActions>
      )}
      {status === "result" && (
        <DialogActions>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export default CommonDialog;
