"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Plus, Trash2, Search, SortAsc, SortDesc, Eye, Tag, X, Filter } from "lucide-react"
import FileUpload from "@/components/FileUpload"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// Define type for file object
interface FileItem {
  name: string;
  size: string;
  date: string;
  category: string;
  tags: string[];
  difficulty?: "easy" | "medium" | "hard";
}

export default function Files() {
  const [showUpload, setShowUpload] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<FileItem | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "course materials", "tests", "homework", "notes"]

  const files: FileItem[] = [
    { name: "Biology Textbook.pdf", size: "12.5 MB", date: "2 days ago", category: "course materials", tags: ["biology", "textbook"], difficulty: "medium" },
    { name: "Chemistry Notes.pdf", size: "8.2 MB", date: "3 days ago", category: "notes", tags: ["chemistry"], difficulty: "easy" },
    { name: "Physics Lab Manual.pdf", size: "15.1 MB", date: "1 week ago", category: "course materials", tags: ["physics", "lab"], difficulty: "hard" },
    { name: "Math Workbook.pdf", size: "10.3 MB", date: "2 weeks ago", category: "homework", tags: ["math", "exercises"], difficulty: "medium" },
    { name: "History Timeline.pdf", size: "5.7 MB", date: "3 weeks ago", category: "notes", tags: ["history"] },
    { name: "Literature Anthology.pdf", size: "20.2 MB", date: "1 month ago", category: "course materials", tags: ["literature"], difficulty: "easy" },
  ]

  const confirmDelete = (file: FileItem) => {
    setFileToDelete(file)
    setShowDeleteDialog(true)
  }

  const handleDelete = () => {
    // Handle actual deletion
    if (fileToDelete) {
      console.log(`Deleting ${fileToDelete.name}`)
    }
    setShowDeleteDialog(false)
    setFileToDelete(null)
  }

  const openPreview = (file: FileItem) => {
    setPreviewFile(file)
    setShowPreview(true)
  }
  
  const handleDownload = (file: FileItem) => {
    // In a real implementation, this would trigger an API call to get the file
    console.log(`Downloading ${file.name}`)
    
    // Create a mock download by creating a dummy blob
    const blob = new Blob(['Mock file content for ' + file.name], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    
    // Clean up
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
    
    // Show success message
    alert(`Downloading ${file.name}`)
  }

  const sortedFiles = [...files]
    // Filter by category
    .filter(file => selectedCategory === "all" || file.category === selectedCategory)
    // Filter by search term
    .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    // Sort by the selected field and order
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      } else if (sortBy === "size") {
        const aSize = parseFloat(a.size)
        const bSize = parseFloat(b.size)
        return sortOrder === "asc" ? aSize - bSize : bSize - aSize
      } else {
        // Date sorting (simplified)
        return sortOrder === "asc" 
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date)
      }
    })

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null
    return sortOrder === "asc" ? <SortAsc className="h-4 w-4 ml-1" /> : <SortDesc className="h-4 w-4 ml-1" />
  }

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty) return "";
    
    switch(difficulty) {
      case "easy": return "bg-green-100 text-green-800 border-green-300";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "hard": return "bg-red-100 text-red-800 border-red-300";
      default: return "";
    }
  };

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

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#2A9E92]" />
          <Input 
            type="search" 
            placeholder="Search files by name or tag..." 
            className="pl-8 border-[#A7EFE4]" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] border-[#A7EFE4]">
              <Filter className="h-4 w-4 mr-2 text-[#2A9E92]" />
              <SelectValue placeholder="Category" className="text-[#1C7D73]" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border border-[#A7EFE4] bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-[#F0FEFA]">
            <TableRow>
              <TableHead className="cursor-pointer text-[#1C7D73] font-semibold" onClick={() => toggleSort("name")}>
                <div className="flex items-center">
                  Name {getSortIcon("name")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-[#1C7D73] font-semibold" onClick={() => toggleSort("size")}>
                <div className="flex items-center">
                  Size {getSortIcon("size")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-[#1C7D73] font-semibold" onClick={() => toggleSort("date")}>
                <div className="flex items-center">
                  Uploaded {getSortIcon("date")}
                </div>
              </TableHead>
              <TableHead className="text-[#1C7D73] font-semibold">Category</TableHead>
              <TableHead className="text-[#1C7D73] font-semibold">Tags</TableHead>
              <TableHead className="text-[#1C7D73] font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-[#2A9E92]">
                  No files found matching your search criteria
                </TableCell>
              </TableRow>
            ) : (
              sortedFiles.map((file, index) => (
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
                  <TableCell>
                    <Badge variant="outline" className="capitalize text-[#2A9E92] border-[#A7EFE4]">
                      {file.category}
                    </Badge>
                    {file.difficulty && (
                      <Badge className={`ml-2 capitalize border ${getDifficultyColor(file.difficulty)}`}>
                        {file.difficulty}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {file.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs bg-[#F0FEFA] text-[#2A9E92]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Preview" 
                        onClick={() => openPreview(file)}
                        className="hover:bg-[#DAFFF9] hover:text-[#2BAEA1] transition-all duration-200 hover:translate-y-[-2px]"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Download" 
                        onClick={() => handleDownload(file)}
                        className="hover:bg-[#DAFFF9] hover:text-[#2BAEA1] transition-all duration-200 hover:translate-y-[-2px]"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Delete" 
                        onClick={() => confirmDelete(file)}
                        className="hover:bg-red-50 hover:text-red-500 transition-all duration-200 hover:translate-y-[-2px]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#1C7D73]">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-[#2A9E92]">
              Are you sure you want to delete {fileToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
              className="border-[#A7EFE4] text-[#2A9E92] hover:bg-[#F0FEFA] hover:text-[#2BAEA1]"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File Preview Dialog */}
      <Dialog 
        open={showPreview} 
        onOpenChange={setShowPreview}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#1C7D73]">
              <FileText className="h-5 w-5 text-[#2BAEA1]" />
              {previewFile?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-[#F0FEFA] rounded-md h-[400px] flex items-center justify-center">
            {/* This would be replaced with an actual preview component */}
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-[#2BAEA1]" />
              <p className="text-[#2A9E92]">Preview not available</p>
              <p className="text-sm text-[#2A9E92]">In a real implementation, this would show a PDF preview</p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setShowPreview(false)}
              className="bg-[#2BAEA1] hover:bg-[#239085] text-white"
            >
              Close
            </Button>
            <Button 
              variant="outline" 
              className="gap-1.5 border-[#A7EFE4] text-[#2A9E92] hover:bg-[#F0FEFA] hover:text-[#2BAEA1]" 
              onClick={() => previewFile && handleDownload(previewFile)}
              disabled={!previewFile}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 