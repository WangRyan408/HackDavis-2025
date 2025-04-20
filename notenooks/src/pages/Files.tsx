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
        <h1 className="text-3xl font-bold tracking-tight text-[#1C7D73]">Your Files</h1>
        <Button 
          className="gap-1.5 bg-black hover:bg-black/80 text-white transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md" 
          onClick={() => setShowUpload(!showUpload)}
        >
          <Plus className="h-4 w-4" />
          Upload File
        </Button>
      </div>

      {showUpload && (
        <div className="bg-white border border-[#A7EFE4] rounded-lg p-6 mb-6 shadow-sm">
          <FileUpload />
        </div>
      )}

      <div className="rounded-md border border-[#A7EFE4] bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-[#F0FEFA]">
            <TableRow>
              <TableHead className="text-[#1C7D73] font-semibold">Name</TableHead>
              <TableHead className="text-[#1C7D73] font-semibold">Size</TableHead>
              <TableHead className="text-[#1C7D73] font-semibold">Uploaded</TableHead>
              <TableHead className="text-[#1C7D73] font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index} className="hover:bg-[#F8FFFD] transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="bg-[#DAFFF9] p-2 rounded-md">
                      <FileText className="h-4 w-4 text-[#2BAEA1]" />
                    </div>
                    <span className="font-medium text-[#1C7D73]">{file.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[#2A9E92]">{file.size}</TableCell>
                <TableCell className="text-[#2A9E92]">{file.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Download"
                      className="hover:bg-[#DAFFF9] hover:text-[#2BAEA1] transition-all duration-200 hover:translate-y-[-2px]"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Delete"
                      className="hover:bg-red-50 hover:text-red-500 transition-all duration-200 hover:translate-y-[-2px]"
                    >
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
