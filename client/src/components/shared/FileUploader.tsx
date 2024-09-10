import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import SvgIcon from "./SvgIcon";
import Button from "./Button";

interface FileUploaderProps {
  label: string;
  value: FileWithPath | null;
  setState: React.Dispatch<React.SetStateAction<FileWithPath | null>>;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  value,
  setState,
}) => {
  // state for temp URL
  const [fileUrl, setFileUrl] = useState("");

  // Whenever a file is selected or dropped this function is called to change the value or set
  // State to selected file and create a temp url to display the file
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) {
        setState(acceptedFiles[0]);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      }
    },
    [value]
  );

  // This section defines the type of files accepted and the max number of files.
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
    maxFiles: 1,
  });

  return (
    <span>
      <span className="input-field-label">{label}</span>
      <div className="file-upload-container" {...getRootProps()}>
        <input {...getInputProps()} name="meme" />
        {value ? (
          // A file is selected so display the file
          <span
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "30px",
            }}
          >
            <img src={fileUrl} className="file-uploader-image" />
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "13px",
                color: "#76abae",
              }}
            >
              Click or drag another meme to replace
            </p>
          </span>
        ) : (
          // No file is selected
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
              margin: "50px",
            }}
          >
            <SvgIcon
              width="56"
              path={[
                "M93.22,33.05a9.46,9.46,0,1,1-9.47,9.46,9.45,9.45,0,0,1,9.47-9.46Zm7.49-22.22v-3H7.86V74.32h4.43v7.86H6.89a6.87,6.87,0,0,1-4.86-2,6.81,6.81,0,0,1-2-4.85V6.89A6.9,6.9,0,0,1,6.89,0h94.79a6.9,6.9,0,0,1,6.89,6.89v3.94Zm9.16,76.36L93.47,61a3.76,3.76,0,0,0-6.37,0L79.36,73.47l8.42,13.72H84.32l-23-36.68a4.37,4.37,0,0,0-7.4,0L31.47,87.19H28.32V26.83H115V87.19ZM116,95H27.35a6.91,6.91,0,0,1-6.89-6.88V25.86A6.91,6.91,0,0,1,27.35,19H116a6.9,6.9,0,0,1,6.88,6.88v62.3A6.91,6.91,0,0,1,116,95Z",
              ]}
              viewbox="0 0 122.88 95.04"
            />
            <h3
              style={{
                fontFamily: "Montserrat",
                fontWeight: "300",
                fontSize: "15px",
              }}
            >
              Drag your meme here
            </h3>
            <p
              style={{
                color: "rgba(118, 171, 174, 0.35)",
                fontFamily: "Russo One",
                fontWeight: "200",
              }}
            >
              SVG, JPG, PNG
            </p>
            <Button className="file-upload-button" type="button">
              Select from device
            </Button>
          </span>
        )}
      </div>
    </span>
  );
};

export default FileUploader;
