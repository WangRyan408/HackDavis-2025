import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock type for the uploaded file response
interface UploadedFile {
  name: string;
  size: number;
  url: string;
  key: string;
}

interface UploadthingButtonProps {
  onUploadComplete?: (files: UploadedFile[]) => void;
  className?: string;
}

export default function UploadthingButton({ onUploadComplete, className = "" }: UploadthingButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle uploading files
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setMessage("Preparing files...");
    
    try {
      // Create some mock response data
      const mockUploadedFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
        name: file.name,
        size: file.size,
        url: `https://mock-upload-url.com/${file.name}`,
        key: `file-${Date.now()}-${index}`,
      }));

      // Simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage("Upload successful!");
      
      // Call the completion handler
      if (onUploadComplete) {
        onUploadComplete(mockUploadedFiles);
      }
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf"
        multiple
      />
      
      <Button 
        className={`gap-1.5 ${className}`}
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <Plus className="h-4 w-4" />
        {isUploading ? "Uploading..." : "Upload File"}
      </Button>
      
      {message && (
        <div className="mt-2 text-xs text-gray-500">
          {message}
        </div>
      )}
    </div>
  );
} 