import React from "react";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const VisuallyHiddenInput = styled("TextField")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const UploadButton = () => {
  return (
    <Button
      //   component="label"
      //   role={undefined}
      //   tabIndex={-1}
      variant="contained"
      component="label"
      startIcon={<CloudUploadOutlinedIcon color="textSecondary" />}>
      Upload a File
      <input type="file" hidden />
      {/* <VisuallyHiddenInput type="file" /> */}
    </Button>
  );
};
export default UploadButton;
