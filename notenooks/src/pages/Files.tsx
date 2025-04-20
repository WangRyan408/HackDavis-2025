"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Plus, Trash2 } from "lucide-react"
import FileUpload from "@/components/FileUpload"
import { useState } from "react"

export default function Files() {
  const [showUpload, setShowUpload] = useState(false)

  const files = [
    { name: "Biology Textbook.pdf", size: "12.5 MB", date: "2 days ago" },
    { name: "Chemistry Notes.pdf", size: "8.2 MB", date: "3 days ago" },
    { name: "Physics Lab Manual.pdf", size: "15.1 MB", date: "1 week ago" },
    { name: "Math Workbook.pdf", size: "10.3 MB", date: "2 weeks ago" },
    { name: "History Timeline.pdf", size: "5.7 MB", date: "3 weeks ago" },
    { name: "Literature Anthology.pdf", size: "20.2 MB", date: "1 month ago" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Your Files</h1>
        <Button className="gap-1.5" onClick={() => setShowUpload(!showUpload)}>
          <Plus className="h-4 w-4" />
          Upload File
        </Button>
      </div>

      {showUpload && (
        <div className="bg-card border rounded-lg p-6 mb-6">
          <FileUpload />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{file.name}</span>
                  </div>
                </TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
