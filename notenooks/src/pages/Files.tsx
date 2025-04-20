"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Plus, Trash2, Search, SortAsc, SortDesc, Eye, Filter } from "lucide-react"
import FileUpload from "@/components/FileUpload"

interface FileItem {
  name: string
  size: string
  date: string
  category: string
  tags: string[]
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
    { name: "Biology Textbook.pdf", size: "12.5 MB", date: "2 days ago", category: "course materials", tags: ["biology", "textbook"] },
    { name: "Chemistry Notes.pdf", size: "8.2 MB", date: "3 days ago", category: "notes", tags: ["chemistry"] },
    { name: "Physics Lab Manual.pdf", size: "15.1 MB", date: "1 week ago", category: "course materials", tags: ["physics", "lab"] },
    { name: "Math Workbook.pdf", size: "10.3 MB", date: "2 weeks ago", category: "homework", tags: ["math", "exercises"] },
    { name: "History Timeline.pdf", size: "5.7 MB", date: "3 weeks ago", category: "notes", tags: ["history"] },
    { name: "Literature Anthology.pdf", size: "20.2 MB", date: "1 month ago", category: "course materials", tags: ["literature"] },
  ]

  const confirmDelete = (file: FileItem) => {
    setFileToDelete(file)
    setShowDeleteDialog(true)
  }

  const handleDelete = () => {
    if (fileToDelete) console.log(`Deleting ${fileToDelete.name}`)
    setShowDeleteDialog(false)
    setFileToDelete(null)
  }

  const openPreview = (file: FileItem) => {
    setPreviewFile(file)
    setShowPreview(true)
  }

  const handleDownload = (file: FileItem) => {
    const blob = new Blob([`Mock content for ${file.name}`], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
    alert(`Downloading ${file.name}`)
  }

  const sortedFiles = [...files]
    .filter(f => selectedCategory === "all" || f.category === selectedCategory)
    .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === "name") return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      if (sortBy === "size") return sortOrder === "asc" ? parseFloat(a.size) - parseFloat(b.size) : parseFloat(b.size) - parseFloat(a.size)
      return sortOrder === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
    })

  const toggleSort = (field: string) => {
    if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null
    return sortOrder === "asc" ? <SortAsc className="h-4 w-4 ml-1" /> : <SortDesc className="h-4 w-4 ml-1" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[#1C7D73]">Your Files</h1>
        <Button className="gap-1.5 bg-black hover:bg-black/80 text-white transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md" onClick={() => setShowUpload(!showUpload)}>
          <Plus className="h-4 w-4" />
          Upload File
        </Button>
      </div>

      {showUpload && (
        <Card className="mb-6 border-[#A7EFE4]">
          <CardContent className="pt-6">
            <FileUpload />
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search files by name or tag..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
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
              <TableHead className="cursor-pointer" onClick={() => toggleSort("name")}>Name {getSortIcon("name")}</TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("size")}>Size {getSortIcon("size")}</TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("date")}>Uploaded {getSortIcon("date")}</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
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
                  <TableCell><Badge variant="outline" className="capitalize">{file.category}</Badge></TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {file.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Preview" onClick={() => openPreview(file)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Download" onClick={() => handleDownload(file)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => confirmDelete(file)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {fileToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {previewFile?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-muted/30 rounded-md h-[400px] flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Preview not available</p>
              <p className="text-sm text-muted-foreground">In a real implementation, this would show a PDF preview</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Close</Button>
            <Button variant="outline" className="gap-1.5" onClick={() => previewFile && handleDownload(previewFile)} disabled={!previewFile}>
              <Download className="h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

