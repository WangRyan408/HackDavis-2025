import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Trash2, Upload } from "lucide-react"
import { useState } from "react"
import { UploadButton } from "@/lib/uploadthing"
import type { UploadFileResponse } from "@/lib/uploadthing"
// import FileDropzone from "@/components/FileDropzone"

interface FileData {
  id?: string;
  name: string;
  size: string;
  date: string;
  url?: string;
}

// Set this to false to use the more reliable BasicUpload component
const USE_UPLOAD_THING = false;

export default function Files() {
  const [showUpload, setShowUpload] = useState(false)
  const [files, setFiles] = useState<FileData[]>([
    { name: "Biology Textbook.pdf", size: "12.5 MB", date: "2 days ago" },
    { name: "Chemistry Notes.pdf", size: "8.2 MB", date: "3 days ago" },
    { name: "Physics Lab Manual.pdf", size: "15.1 MB", date: "1 week ago" },
    { name: "Math Workbook.pdf", size: "10.3 MB", date: "2 weeks ago" },
    { name: "History Timeline.pdf", size: "5.7 MB", date: "3 weeks ago" },
    { name: "Literature Anthology.pdf", size: "20.2 MB", date: "1 month ago" },
  ])

  // Function to handle uploaded files
  const handleUploadComplete = (uploadedFiles: UploadFileResponse[]) => {
    console.log("Files uploaded:", uploadedFiles);
    
    const newFiles = uploadedFiles.map(file => ({
      id: file.key || String(Date.now()),
      name: file.name || "Unknown file",
      size: formatFileSize(file.size || 0),
      date: "Just now",
      url: file.url || ""
    }));
    
    setFiles(prev => [...newFiles, ...prev]);
    setShowUpload(false);
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

   return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Files</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowUpload(!showUpload)}>
            {showUpload ? "Cancel" : "Upload New"}
          </Button>
        </div>
      </div>

      {showUpload && (
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          {(
            <>
              <h3 className="text-lg font-medium mb-4">Upload Files</h3>
              {/* Custom styled UploadThing button */}
              <div className="bg-primary/5 rounded-lg p-6 border-2 border-dashed border-primary/20">
                <UploadButton
                  endpoint="documentUploader"
                  onClientUploadComplete={(res) => {
                    if (res) {
                      handleUploadComplete(res as UploadFileResponse[]);
                      alert("Upload completed");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Error uploading: ${error.message}`);
                  }}
                  content={{
                    button({ ready }) {
                      return (
                        <div className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-white font-medium flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          {ready ? "Upload PDF files" : "Loading..."}
                        </div>
                      );
                    },
                    allowedContent() {
                      return <p className="text-sm text-gray-500 mt-2">PDF files up to 32MB</p>;
                    },
                  }}
                />
              </div>
            </>
          )}

          <p className="text-sm text-gray-500 mt-4">
            You can upload PDF files like textbooks, notes, or study guides.
          </p>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={file.id || index}>
              <TableCell className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {file.name}
              </TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>{file.date}</TableCell>
              <TableCell className="flex items-center gap-2">
                {file.url ? (
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </a>
                ) : (
                  <Button variant="ghost" size="icon" disabled>
                    <Download className="h-4 w-4" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => {
                    setFiles(prev => prev.filter((_, i) => i !== index));
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
