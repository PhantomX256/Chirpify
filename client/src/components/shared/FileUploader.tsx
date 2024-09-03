interface FileUploaderProps {
  label: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ label }) => {
  return (
    <span>
      <span className="input-field-label">{label}</span>
      <div>
        FileUploader
      </div>
    </span>
  )
}

export default FileUploader
