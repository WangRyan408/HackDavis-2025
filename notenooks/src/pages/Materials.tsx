import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, Download, FileText, GraduationCap, 
  Search, Eye, SortAsc, SortDesc, Filter, Calendar, User
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { GenerateMaterialsDialog } from "@/components/GenerateMaterialsDialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useMemo } from "react"

// Define types for the material items
interface MaterialItem {
  id: string;
  name: string;
  subject: string;
  date: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  timeEstimate: string;
  author: string;
}

// Common type for different material categories
type MaterialList = MaterialItem[];

export default function Materials() {
  // State management for search, filtering, sorting and previewing
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState("tests");
  const [showPreview, setShowPreview] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState<MaterialItem | null>(null);

  // Sample data - in a real app, this would come from an API
  const tests: MaterialList = [
    { 
      id: "t1", 
      name: "Biology Quiz", 
      subject: "Biology", 
      date: "1 day ago",
      description: "A comprehensive quiz covering cellular biology concepts",
      difficulty: "medium",
      timeEstimate: "30 minutes",
      author: "Dr. Smith"
    },
    { 
      id: "t2", 
      name: "Chemistry Midterm", 
      subject: "Chemistry", 
      date: "1 week ago",
      description: "Midterm exam covering organic chemistry fundamentals",
      difficulty: "hard",
      timeEstimate: "90 minutes",
      author: "Prof. Johnson"
    },
    { 
      id: "t3", 
      name: "Physics Final", 
      subject: "Physics", 
      date: "2 weeks ago",
      description: "Comprehensive final exam on mechanics and thermodynamics",
      difficulty: "hard",
      timeEstimate: "120 minutes",
      author: "Dr. Williams"
    },
    { 
      id: "t4", 
      name: "Math Assessment", 
      subject: "Mathematics", 
      date: "3 weeks ago",
      description: "Assessment covering algebra and calculus",
      difficulty: "medium",
      timeEstimate: "60 minutes",
      author: "Prof. Davis"
    },
  ]

  const homework: MaterialList = [
    { 
      id: "h1", 
      name: "Biology Worksheet", 
      subject: "Biology", 
      date: "2 days ago",
      description: "Worksheet on plant biology and photosynthesis",
      difficulty: "easy",
      timeEstimate: "45 minutes",
      author: "Dr. Smith"
    },
    { 
      id: "h2", 
      name: "Chemistry Problems", 
      subject: "Chemistry", 
      date: "5 days ago",
      description: "Problem set on atomic structure and bonding",
      difficulty: "medium",
      timeEstimate: "60 minutes",
      author: "Prof. Johnson"
    },
    { 
      id: "h3", 
      name: "Physics Exercises", 
      subject: "Physics", 
      date: "1 week ago",
      description: "Problem solving exercises on forces and motion",
      difficulty: "hard",
      timeEstimate: "90 minutes",
      author: "Dr. Williams"
    },
  ]

  const teachingAids: MaterialList = [
    { 
      id: "a1", 
      name: "Biology Flashcards", 
      subject: "Biology", 
      date: "3 days ago",
      description: "Visual flashcards for key biology concepts",
      difficulty: "easy",
      timeEstimate: "20 minutes",
      author: "Dr. Smith"
    },
    { 
      id: "a2", 
      name: "Chemistry Diagrams", 
      subject: "Chemistry", 
      date: "1 week ago",
      description: "Visual diagrams of chemical structures and reactions",
      difficulty: "medium",
      timeEstimate: "30 minutes",
      author: "Prof. Johnson"
    },
    { 
      id: "a3", 
      name: "Physics Demonstrations", 
      subject: "Physics", 
      date: "2 weeks ago",
      description: "Interactive demonstrations of physics principles",
      difficulty: "medium",
      timeEstimate: "45 minutes",
      author: "Dr. Williams"
    },
    { 
      id: "a4", 
      name: "Math Concept Maps", 
      subject: "Mathematics", 
      date: "3 weeks ago",
      description: "Visual concept maps connecting mathematical ideas",
      difficulty: "medium",
      timeEstimate: "25 minutes",
      author: "Prof. Davis"
    },
    { 
      id: "a5", 
      name: "History Timelines", 
      subject: "History", 
      date: "1 month ago",
      description: "Detailed historical timelines for major events",
      difficulty: "easy",
      timeEstimate: "30 minutes",
      author: "Prof. Miller"
    },
  ]

  // Get all unique subjects for the filter
  const allSubjects = useMemo(() => {
    const subjects = new Set<string>()
    subjects.add("all")
    
    ;[...tests, ...homework, ...teachingAids].forEach(item => {
      subjects.add(item.subject)
    })
    
    return Array.from(subjects)
  }, [tests, homework, teachingAids])

  // Filter and sort materials based on search, subject, and sort criteria
  const filteredMaterials = (materials: MaterialList) => {
    return materials
      // Filter by subject
      .filter(material => selectedSubject === "all" || material.subject === selectedSubject)
      // Filter by search term
      .filter(material => 
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      // Sort by the selected field and order
      .sort((a, b) => {
        if (sortBy === "name") {
          return sortOrder === "asc" 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        } else if (sortBy === "subject") {
          return sortOrder === "asc" 
            ? a.subject.localeCompare(b.subject)
            : b.subject.localeCompare(a.subject)
        } else {
          // Date sorting (simplified)
          return sortOrder === "asc" 
            ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date)
        }
      })
  }

  // Filtered collections based on current filters
  const filteredTests = filteredMaterials(tests)
  const filteredHomework = filteredMaterials(homework)
  const filteredTeachingAids = filteredMaterials(teachingAids)

  // Determine if any materials match the current filters
  const hasResults = 
    (activeTab === "tests" && filteredTests.length > 0) ||
    (activeTab === "homework" && filteredHomework.length > 0) ||
    (activeTab === "teaching-aids" && filteredTeachingAids.length > 0) ||
    activeTab === "all";

  // Handle sorting toggle
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  // Get sort icon for table headers
  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null
    return sortOrder === "asc" 
      ? <SortAsc className="h-4 w-4 ml-1" /> 
      : <SortDesc className="h-4 w-4 ml-1" />
  }

  // Handle preview material
  const handlePreview = (material: MaterialItem) => {
    setPreviewMaterial(material)
    setShowPreview(true)
  }

  // Handle downloading a material
  const handleDownload = (material: MaterialItem) => {
    // In a real implementation, this would trigger an API call to get the material
    console.log(`Downloading ${material.name} (${material.subject})`)
    
    // Create a mock download by creating a dummy blob
    const content = `
      Name: ${material.name}
      Subject: ${material.subject}
      Description: ${material.description}
      Difficulty: ${material.difficulty}
      Time Estimate: ${material.timeEstimate}
      Author: ${material.author}
      
      This is mock content for demonstration purposes.
    `
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a')
    a.href = url
    a.download = `${material.name}.txt`
    document.body.appendChild(a)
    a.click()
    
    // Clean up
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
    
    // Show success message
    alert(`Downloading ${material.name}`)
  }

  // Get the appropriate icon for a material type
  const getMaterialIcon = (type: string, size: number = 4) => {
    switch(type) {
      case "tests": return <BookOpen className={`h-${size} w-${size} text-primary`} />
      case "homework": return <FileText className={`h-${size} w-${size} text-primary`} />
      case "teaching-aids": return <GraduationCap className={`h-${size} w-${size} text-primary`} />
      default: return <FileText className={`h-${size} w-${size} text-primary`} />
    }
  }

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return ""
    }
  }

  // Render table for materials
  const renderMaterialsTable = (materials: MaterialList, type: string) => (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => toggleSort("name")}>
              <div className="flex items-center">
                Name {getSortIcon("name")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort("subject")}>
              <div className="flex items-center">
                Subject {getSortIcon("subject")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort("date")}>
              <div className="flex items-center">
                Created {getSortIcon("date")}
              </div>
            </TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No materials found matching your search criteria
              </TableCell>
            </TableRow>
          ) : (
            materials.map((material) => (
              <TableRow key={material.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-md">
                      {getMaterialIcon(type)}
                    </div>
                    <span className="font-medium">{material.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{material.subject}</Badge>
                </TableCell>
                <TableCell>{material.date}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`${getDifficultyColor(material.difficulty)} capitalize`}>
                    {material.difficulty}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Preview"
                      onClick={() => handlePreview(material)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Download" onClick={() => handleDownload(material)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Course Materials</h1>
        <GenerateMaterialsDialog />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search materials..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              {allSubjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject === "all" ? "All Subjects" : subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="tests" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="homework">Homework</TabsTrigger>
          <TabsTrigger value="teaching-aids">Teaching Aids</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="mt-6">
          {renderMaterialsTable(filteredTests, "tests")}
        </TabsContent>

        <TabsContent value="homework" className="mt-6">
          {renderMaterialsTable(filteredHomework, "homework")}
        </TabsContent>

        <TabsContent value="teaching-aids" className="mt-6">
          {renderMaterialsTable(filteredTeachingAids, "teaching-aids")}
        </TabsContent>
      </Tabs>

      {/* No results message when all tabs are empty */}
      {!hasResults && searchTerm !== "" && (
        <div className="text-center p-8 bg-muted/30 rounded-lg mt-4">
          <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-1">No materials found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}

      {/* Material Preview Dialog */}
      <Dialog 
        open={showPreview} 
        onOpenChange={setShowPreview}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {previewMaterial && getMaterialIcon("", 5)}
              {previewMaterial?.name}
            </DialogTitle>
          </DialogHeader>
          
          {previewMaterial && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Material Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Subject</p>
                      <p>{previewMaterial.subject}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Difficulty</p>
                      <p className="capitalize">{previewMaterial.difficulty}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Time Estimate</p>
                      <p>{previewMaterial.timeEstimate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Created</p>
                      <p>{previewMaterial.date}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 pt-2">
                    <p className="text-sm font-medium text-muted-foreground">Description</p>
                    <p>{previewMaterial.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Created by {previewMaterial.author}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted/30 rounded-md h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Material content preview not available</p>
                  <p className="text-sm text-muted-foreground">Download to view the full content</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Close</Button>
            <Button 
              variant="outline" 
              className="gap-1.5" 
              onClick={() => previewMaterial && handleDownload(previewMaterial)}
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
