import { createUploadthing } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  // Define FileRoutes with a unique routeSlug

  // Example of another route for documents
  documentUploader: f({
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  }).onUploadComplete(async ({data, file}) => {
    try {
      console.log("Upload Completed with metadata: ", data);
      console.log("File Details: ", file);
      
      // Return data to be sent back to the client
      return {
        message: "Upload successful",
        fileUrl: file.ufsUrl,
        fileName: file.name
      };
    } catch (error) {
      console.error("Error in onUploadComplete:", error);
      throw new Error("Failed to process uploaded file");
    }
  })
};