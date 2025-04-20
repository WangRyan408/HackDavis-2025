// Merged Dashboard.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GenerateMaterialsDialog } from "@/components/GenerateMaterialsDialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  BookOpen,
  GraduationCap,
  Search,
  Upload,
  FilePlus,
  FileQuestion,
  BarChart3,
  PieChart,
  Plus,
} from "lucide-react"

export default function Dashboard() {
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [testName, setTestName] = useState("")
  const [homeworkName, setHomeworkName] = useState("")
  const [quizName, setQuizName] = useState("")
  const [subject, setSubject] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [goalDialogOpen, setGoalDialogOpen] = useState(false)
  const [goalTask, setGoalTask] = useState("")
  const [goalDueDate, setGoalDueDate] = useState("")

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [testDialogOpen, setTestDialogOpen] = useState(false)
  const [homeworkDialogOpen, setHomeworkDialogOpen] = useState(false)
  const [quizDialogOpen, setQuizDialogOpen] = useState(false)

  const handleUploadFile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setUploadDialogOpen(false)
    setUploadFile(null)
    alert("File uploaded successfully!")
  }

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setTestDialogOpen(false)
    setTestName("")
    setSubject("")
    alert("Test created successfully!")
  }

  const handleCreateHomework = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setHomeworkDialogOpen(false)
    setHomeworkName("")
    setSubject("")
    alert("Homework created successfully!")
  }

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setQuizDialogOpen(false)
    setQuizName("")
    setSubject("")
    alert("Quiz created successfully!")
  }

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setGoalDialogOpen(false)
    setGoalTask("")
    setGoalDueDate("")
    alert("Goal added successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#1C7D73]">Welcome back, Professor</h1>
        <p className="text-muted-foreground">Here's what's happening with your teaching materials</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-[#1C7D73]">Dashboard</h2>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search files and materials..." className="pl-8" />
          </div>
          <GenerateMaterialsDialog />
        </div>
      </div>

      {/* Add Button Grid Section (Upload, Test, Homework, Quiz) */}
      {/* Reuse Dialog logic above as needed */}

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[{
          title: "Total Files",
          icon: <FileText className="h-4 w-4 text-[#2BAEA1]" />,
          value: 12,
          diff: "+2 from last week"
        }, {
          title: "Generated Tests",
          icon: <BookOpen className="h-4 w-4 text-[#2BAEA1]" />,
          value: 8,
          diff: "+3 from last week"
        }, {
          title: "Teaching Aids",
          icon: <GraduationCap className="h-4 w-4 text-[#2BAEA1]" />,
          value: 5,
          diff: "+1 from last week"
        }].map((stat, i) => (
          <Card key={i} className="border-[#A7EFE4] hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-[#2BAEA1]">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1C7D73]">{stat.value}</div>
              <p className="text-xs text-[#2A9E92]">{stat.diff}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Graphs */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {[{
          title: "Weekly Activity",
          desc: "Your material generation trends",
          icon: <BarChart3 className="h-16 w-16 text-muted" />,
          label: "Activity Chart"
        }, {
          title: "Materials Breakdown",
          desc: "Types of materials created",
          icon: <PieChart className="h-16 w-16 text-muted" />,
          label: "Distribution Chart"
        }].map((chart, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{chart.title}</CardTitle>
              <CardDescription>{chart.desc}</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md">
                {chart.icon}
                <span className="ml-2 text-muted">{chart.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Goals */}
      {/* Reuse Goal logic above */}

      {/* Recent Files & Materials */}
      <div className="grid gap-6 md:grid-cols-2">
        {[{
          title: "Recent Files",
          desc: "Your recently uploaded files",
          icon: <FileText className="h-4 w-4 text-muted-foreground" />,
          items: ["Biology Textbook.pdf", "Chemistry Notes.pdf", "Physics Lab Manual.pdf"]
        }, {
          title: "Recent Materials",
          desc: "Your recently generated materials",
          icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
          items: ["Biology Quiz", "Chemistry Homework", "Physics Flashcards"]
        }].map((section, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {section.icon}
                      <span>{item}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{j + 1} days ago</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
