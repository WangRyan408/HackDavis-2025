import { UploadDropzone } from "@/lib/uploadthing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { UploadFileResponse } from "@/lib/uploadthing";

interface FileDropzoneProps {
  onUploadComplete: (files: UploadFileResponse[]) => void;
}

export default function FileDropzone({ onUploadComplete }: FileDropzoneProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Upload Files</CardTitle>
        <CardDescription>
          Drop your files here or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UploadDropzone
          endpoint="documentUploader"
          onClientUploadComplete={(res) => {
            if (res) {
              onUploadComplete(res as UploadFileResponse[]);
            }
          }}
          onUploadError={(error: Error) => {
            console.error("Error uploading:", error);
            alert(`Upload failed: ${error.message}`);
          }}
          content={{
            label: ({ ready }) => (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <svg
                    className="h-10 w-10 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 text-sm">
                  {ready ? "Drag & drop files or click to browse" : "Loading..."}
                </span>
              </div>
            ),
            allowedContent: () => (
              <div className="text-center text-xs text-gray-500 mt-2">
                PDF files up to 32MB
              </div>
            ),
          }}
        />
      </CardContent>
    </Card>
  );
} 