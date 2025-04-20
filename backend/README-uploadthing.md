# UploadThing Integration

This project uses UploadThing for file uploads. The setup includes:

## Files Created

1. `/routes/uploadthing.js`: Contains the FileRoute definitions for different file types
2. `/middleware/uploadthingMiddleware.js`: Contains the Express middleware for UploadThing integration

## Environment Variables

Make sure to add the following to your `.env` file:

```
UPLOADTHING_APP_ID=your_app_id
UPLOADTHING_SECRET=your_secret_key
```

You can get these credentials by creating an account at [uploadthing.com](https://uploadthing.com).

## Available FileRoutes

1. `documentUploader`: Accepts PDF files up to 8MB

## Usage from Client-Side

You can use the UploadThing client libraries to interact with these routes:

```javascript
// For React
import { generateReactHelpers } from "@uploadthing/react";

// Define the type
export const { useUploadThing } = generateReactHelpers();

// Then in your component
const { startUpload } = useUploadThing("documentUploader");

// Upload a file
const result = await startUpload(files);
```

### Example React Component

```jsx
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const { startUpload, isUploading } = useUploadThing("documentUploader");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await startUpload(files);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="file" 
        onChange={(e) => setFiles(Array.from(e.target.files))}
        accept=".pdf"
        multiple
      />
      <button type="submit" disabled={isUploading || files.length === 0}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
```

## Authentication

The routes are configured to use the user object from request. Make sure your auth middleware populates `req.user` before the UploadThing middleware runs.

For more information, see the [UploadThing documentation](https://docs.uploadthing.com/). 