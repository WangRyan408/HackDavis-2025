// Merged version of Materials.tsx with enhancements from Andre's version
// Includes full filtering, sorting, UI improvements, and preview dialog

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BookOpen, Download, FileText, GraduationCap,
  Search, Eye, SortAsc, SortDesc, Filter, User
} from "lucide-react"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { GenerateMaterialsDialog } from "@/components/GenerateMaterialsDialog"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog"
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { useState, useMemo } from "react"

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

type MaterialList = MaterialItem[]

export default function Materials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = useState("tests")
  const [showPreview, setShowPreview] = useState(false)
  const [previewMaterial, setPreviewMaterial] = useState<MaterialItem | null>(null)

  const tests: MaterialList = [
    { id: "1", name: "Biology Quiz", subject: "Biology", date: "1 day ago", description: "A comprehensive quiz covering cellular biology concepts", difficulty: "medium", timeEstimate: "30 minutes", author: "Dr. Smith" },
    { id: "2", name: "Chemistry Midterm", subject: "Chemistry", date: "1 week ago", description: "Midterm exam covering organic chemistry fundamentals", difficulty: "hard", timeEstimate: "90 minutes", author: "Prof. Johnson" },
    { id: "3", name: "Physics Final", subject: "Physics", date: "2 weeks ago", description: "Comprehensive final exam on mechanics and thermodynamics", difficulty: "hard", timeEstimate: "120 minutes", author: "Dr. Williams" },
    { id: "4", name: "Math Assessment", subject: "Mathematics", date: "3 weeks ago", description: "Assessment covering algebra and calculus", difficulty: "medium", timeEstimate: "60 minutes", author: "Prof. Davis" },
  ]

  const homework: MaterialList = [
    { id: "5", name: "Biology Worksheet", subject: "Biology", date: "2 days ago", description: "Worksheet on plant biology and photosynthesis", difficulty: "easy", timeEstimate: "45 minutes", author: "Dr. Smith" },
    { id: "6", name: "Chemistry Problems", subject: "Chemistry", date: "5 days ago", description: "Problem set on atomic structure and bonding", difficulty: "medium", timeEstimate: "60 minutes", author: "Prof. Johnson" },
    { id: "7", name: "Physics Exercises", subject: "Physics", date: "1 week ago", description: "Problem solving exercises on forces and motion", difficulty: "hard", timeEstimate: "90 minutes", author: "Dr. Williams" },
  ]

  const teachingAids: MaterialList = [
    { id: "8", name: "Biology Flashcards", subject: "Biology", date: "3 days ago", description: "Visual flashcards for key biology concepts", difficulty: "easy", timeEstimate: "20 minutes", author: "Dr. Smith" },
    { id: "9", name: "Chemistry Diagrams", subject: "Chemistry", date: "1 week ago", description: "Visual diagrams of chemical structures and reactions", difficulty: "medium", timeEstimate: "30 minutes", author: "Prof. Johnson" },
    { id: "10", name: "Physics Demonstrations", subject: "Physics", date: "2 weeks ago", description: "Interactive demonstrations of physics principles", difficulty: "medium", timeEstimate: "45 minutes", author: "Dr. Williams" },
    { id: "11", name: "Math Concept Maps", subject: "Mathematics", date: "3 weeks ago", description: "Visual concept maps connecting mathematical ideas", difficulty: "medium", timeEstimate: "25 minutes", author: "Prof. Davis" },
    { id: "12", name: "History Timelines", subject: "History", date: "1 month ago", description: "Detailed historical timelines for major events", difficulty: "easy", timeEstimate: "30 minutes", author: "Prof. Miller" },
  ]

  const allSubjects = useMemo(() => {
    const subjects = new Set(["all"])
    ;[...tests, ...homework, ...teachingAids].forEach(m => subjects.add(m.subject))
    return Array.from(subjects)
  }, [])

  const filteredMaterials = (materials: MaterialList) => {
    return materials
      .filter(m => selectedSubject === "all" || m.subject === selectedSubject)
      .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.description.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const valA = a[sortBy as keyof MaterialItem] as string
        const valB = b[sortBy as keyof MaterialItem] as string
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA)
      })
  }

  const handlePreview = (material: MaterialItem) => {
    setPreviewMaterial(material)
    setShowPreview(true)
  }

  const handleDownload = (material: MaterialItem) => {
    const content = `Name: ${material.name}\nSubject: ${material.subject}\nDescription: ${material.description}`
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${material.name}.txt`
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const getMaterialIcon = (type: string) => {
    switch(type) {
      case "tests": return <BookOpen className="h-4 w-4 text-[#2BAEA1]" />
      case "homework": return <FileText className="h-4 w-4 text-[#2BAEA1]" />
      case "teaching-aids": return <GraduationCap className="h-4 w-4 text-[#2BAEA1]" />
      default: return <FileText className="h-4 w-4 text-[#2BAEA1]" />
    }
  }

  const renderMaterialsTable = (materials: MaterialList, type: string) => (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((m) => (
            <TableRow key={m.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="bg-[#DAFFF9] p-2 rounded-md">{getMaterialIcon(type)}</div>
                  <span className="font-medium text-[#1C7D73]">{m.name}</span>
                </div>
              </TableCell>
              <TableCell><Badge className="bg-[#F0FEFA] text-[#2BAEA1] border-[#A7EFE4]">{m.subject}</Badge></TableCell>
              <TableCell className="text-[#2A9E92]">{m.date}</TableCell>
              <TableCell><Badge variant="outline" className="capitalize">{m.difficulty}</Badge></TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" title="Preview" onClick={() => handlePreview(m)}><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" title="Download" onClick={() => handleDownload(m)}><Download className="h-4 w-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[#1C7D73]">Course Materials</h1>
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
              {allSubjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject === "all" ? "All Subjects" : subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="tests" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-[#F0FEFA] border border-[#A7EFE4]">
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="homework">Homework</TabsTrigger>
          <TabsTrigger value="teaching-aids">Teaching Aids</TabsTrigger>
        </TabsList>

        <TabsContent value="tests">{renderMaterialsTable(filteredMaterials(tests), "tests")}</TabsContent>
        <TabsContent value="homework">{renderMaterialsTable(filteredMaterials(homework), "homework")}</TabsContent>
        <TabsContent value="teaching-aids">{renderMaterialsTable(filteredMaterials(teachingAids), "teaching-aids")}</TabsContent>
      </Tabs>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {previewMaterial && getMaterialIcon(activeTab)}
              {previewMaterial?.name}
            </DialogTitle>
          </DialogHeader>

          {previewMaterial && (
            <Card>
              <CardHeader><CardTitle>Details</CardTitle></CardHeader>
              <CardContent>
                <p><strong>Subject:</strong> {previewMaterial.subject}</p>
                <p><strong>Difficulty:</strong> {previewMaterial.difficulty}</p>
                <p><strong>Time:</strong> {previewMaterial.timeEstimate}</p>
                <p><strong>Date:</strong> {previewMaterial.date}</p>
                <p><strong>Author:</strong> {previewMaterial.author}</p>
                <p><strong>Description:</strong> {previewMaterial.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button onClick={() => setShowPreview(false)}>Close</Button>
                <Button variant="outline" onClick={() => handleDownload(previewMaterial)}><Download className="mr-2 h-4 w-4" />Download</Button>
              </CardFooter>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
