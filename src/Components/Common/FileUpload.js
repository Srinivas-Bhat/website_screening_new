import { Paper, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Dropzone from "react-dropzone";
import styles from "../../styles/Home.module.css";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";

const FileUpload = (props) => {
  const showPreview = true;

  const handleAcceptedFiles = (files) => {
    console.log(files);
    // var allFiles = files;
    // if (showPreview) {
    //   files.map((file) =>
    //     Object.assign(file, {
    //       preview: URL.createObjectURL(file),
    //       formattedSize: props.formatBytes(file.size),
    //     })
    //   );
    //   allFiles = props.selectedFiles;
    //   allFiles.push(...files);
    //   props.setSelectedFiles(allFiles);
    // }
    // if (props.onFileUpload) props.onFileUpload(allFiles);
  };

  useEffect(() => {
    if (props.downloadLink) window.open(props.downloadLink);
  }, [props.downloadLink]);

  return (
    <Dropzone
      accept={{ "text/csv": [".csv"], "application/xlsx": [".xls", ".xlsx"] }}
      maxFiles={1}
      onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}
      {...props}>
      {({ getRootProps, getInputProps }) => (
        <Paper elevation={0} className={styles.dropBox}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Box sx={{ display: "flex", justifyContent: "center", mb: 0.5 }}>
              <BackupOutlinedIcon fontSize="large" sx={{ color: "#ccc" }} />
            </Box>
            <Typography variant="body2" align="center">
              Drop files here or click to upload.
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" align="center">
              Please select{" "}
              <span style={{ textDecoration: "underline" }}>xlsx, csv</span>{" "}
              format files only, select one file at a time (Max length allowed -
              5000)
            </Typography> */}
          </div>
        </Paper>
      )}
    </Dropzone>
  );
};

export default FileUpload;
