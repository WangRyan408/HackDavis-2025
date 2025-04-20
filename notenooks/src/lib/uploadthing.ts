import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

export interface UploadFileResponse {
  name: string;
  size: number;
  key: string;
  url: string;
  serverData?: any;
}

// Point to your Express backend with more verbose config
export const UploadButton = generateUploadButton({
  url: "http://localhost:3000/api/uploadthing",
});

export const UploadDropzone = generateUploadDropzone({
  url: "http://localhost:3000/api/uploadthing",
});