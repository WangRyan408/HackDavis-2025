import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

interface SimpleUploadButtonProps {
  onUploadComplete?: (files: any) => void;
  className?: string;
}

export default function SimpleUploadButton({ onUploadComplete, className = "" }: SimpleUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files).filter((file) => file.type === "application/pdf");
    if (files.length === 0) {
      alert("Please select PDF files only.");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Create a FormData object to send the files
      const formData = new FormData();
      files.forEach(file => {
        formData.append("files", file);
      });
      
      // Send the files to your backend
      const response = await fetch("http://localhost:3000/api/uploadthing", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Call the completion handler with the result
      if (onUploadComplete) {
        onUploadComplete(result);
      }
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
        onClick={triggerFileInput} 
        disabled={isUploading}
        className={`gap-1.5 ${className}`}
      >
        <Plus className="h-4 w-4" />
        {isUploading ? "Uploading..." : "Upload File"}
      </Button>
    </div>
  );
} 