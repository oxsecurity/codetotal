import { filesize } from "filesize";
import { FC } from "react";
import { FileDetails } from "shared-types";
import { DetailsItem } from "./DetailsItem";

export const FileInfo: FC<FileInfoProps> = ({ fileDetails }) => {
  return (
    <>
      <DetailsItem label="Language" value={fileDetails.language} />
      <DetailsItem
        label="File Size"
        value={filesize(fileDetails.fileSize).toString()}
      />
      <DetailsItem label="MD5" value={fileDetails.md5} />
      <DetailsItem label="ssdeep" value={fileDetails.ssdeep} />
      <DetailsItem label="Encoding" value={fileDetails.encoding} />
    </>
  );
};

interface FileInfoProps {
  fileDetails: FileDetails;
}
