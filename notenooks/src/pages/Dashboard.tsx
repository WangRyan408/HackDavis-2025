import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  FileText, BookOpen, GraduationCap, Search, Upload, FilePlus, 
  FileQuestion, BarChart3, PieChart, Plus
} from "lucide-react"
import { GenerateMaterialsDialog } from "@/components/GenerateMaterialsDialog"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  // Form states for each dialog
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [testName, setTestName] = useState("")
  const [homeworkName, setHomeworkName] = useState("")
  const [quizName, setQuizName] = useState("")
  const [subject, setSubject] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  // Goals state
  const [goalDialogOpen, setGoalDialogOpen] = useState(false)
  const [goalTask, setGoalTask] = useState("")
  const [goalDueDate, setGoalDueDate] = useState("")
  
  // Dialog open states
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [testDialogOpen, setTestDialogOpen] = useState(false)
  const [homeworkDialogOpen, setHomeworkDialogOpen] = useState(false)
  const [quizDialogOpen, setQuizDialogOpen] = useState(false)

  // Action handlers
  const handleUploadFile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setUploadDialogOpen(false)
    setUploadFile(null)
    alert("File uploaded successfully!")
  }

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setTestDialogOpen(false)
    setTestName("")
    setSubject("")
    alert("Test created successfully!")
  }

  const handleCreateHomework = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setHomeworkDialogOpen(false)
    setHomeworkName("")
    setSubject("")
    alert("Homework created successfully!")
  }

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setQuizDialogOpen(false)
    setQuizName("")
    setSubject("")
    alert("Quiz created successfully!")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0])
    }
  }
  
  // Add goal handler
  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setGoalDialogOpen(false)
    setGoalTask("")
    setGoalDueDate("")
    alert("Goal added successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Professor</h1>
        <p className="text-muted-foreground">Here's what's happening with your teaching materials</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search files and materials..." className="pl-8" />
          </div>
          <GenerateMaterialsDialog />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Upload File Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-20 flex flex-col gap-1 justify-center">
              <Upload className="h-5 w-5" />
              <span>Upload File</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleUploadFile}>
              <DialogHeader>
                <DialogTitle>Upload File</DialogTitle>
                <DialogDescription>
                  Upload a PDF or document file to your library
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject (optional)</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Biology"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading || !uploadFile}>
                  {isLoading ? "Uploading..." : "Upload"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Test Dialog */}
        <Dialog open={testDialogOpen} onOpenChange={setTestDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-20 flex flex-col gap-1 justify-center">
              <FilePlus className="h-5 w-5" />
              <span>Create Test</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateTest}>
              <DialogHeader>
                <DialogTitle>Create Test</DialogTitle>
                <DialogDescription>
                  Create a new test for your students
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="testName">Test Name</Label>
                  <Input
                    id="testName"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="Midterm Exam"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="testSubject">Subject</Label>
                  <Input
                    id="testSubject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Biology"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Test"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Homework Dialog */}
        <Dialog open={homeworkDialogOpen} onOpenChange={setHomeworkDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-20 flex flex-col gap-1 justify-center">
              <BookOpen className="h-5 w-5" />
              <span>Create Homework</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateHomework}>
              <DialogHeader>
                <DialogTitle>Create Homework</DialogTitle>
                <DialogDescription>
                  Create a new homework assignment
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="homeworkName">Homework Name</Label>
                  <Input
                    id="homeworkName"
                    value={homeworkName}
                    onChange={(e) => setHomeworkName(e.target.value)}
                    placeholder="Chapter 5 Exercises"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="homeworkSubject">Subject</Label>
                  <Input
                    id="homeworkSubject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Biology"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Homework"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Quiz Dialog */}
        <Dialog open={quizDialogOpen} onOpenChange={setQuizDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-20 flex flex-col gap-1 justify-center">
              <FileQuestion className="h-5 w-5" />
              <span>Create Quiz</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateQuiz}>
              <DialogHeader>
                <DialogTitle>Create Quiz</DialogTitle>
                <DialogDescription>
                  Create a new quiz for your students
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="quizName">Quiz Name</Label>
                  <Input
                    id="quizName"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    placeholder="Pop Quiz"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quizSubject">Subject</Label>
                  <Input
                    id="quizSubject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Biology"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Quiz"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Generated Tests</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Teaching Aids</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Your material generation trends</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            {/* Placeholder for chart - would use recharts or similar in actual implementation */}
            <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md">
              <BarChart3 className="h-16 w-16 text-muted" />
              <span className="ml-2 text-muted">Activity Chart</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Materials Breakdown</CardTitle>
            <CardDescription>Types of materials created</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            {/* Placeholder for chart */}
            <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md">
              <PieChart className="h-16 w-16 text-muted" />
              <span className="ml-2 text-muted">Distribution Chart</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Goals</CardTitle>
              <CardDescription>Track your teaching preparation progress</CardDescription>
            </div>
            <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleAddGoal}>
                  <DialogHeader>
                    <DialogTitle>Add New Goal</DialogTitle>
                    <DialogDescription>
                      Add a new goal to track your teaching preparation
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="task">Goal Task</Label>
                      <Input
                        id="task"
                        value={goalTask}
                        onChange={(e) => setGoalTask(e.target.value)}
                        placeholder="Prepare exam questions"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={goalDueDate}
                        onChange={(e) => setGoalDueDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add Goal"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { task: "Prepare midterm exams", progress: 60, due: "3 days" },
              { task: "Create student handouts", progress: 25, due: "1 week" },
              { task: "Update quiz materials", progress: 80, due: "Tomorrow" }
            ].map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{goal.task}</span>
                  <span className="text-sm text-muted-foreground">Due in {goal.due}</span>
                </div>
                <div className="h-2 bg-muted rounded overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Files</CardTitle>
            <CardDescription>Your recently uploaded files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Biology Textbook.pdf", date: "2 days ago" },
                { name: "Chemistry Notes.pdf", date: "3 days ago" },
                { name: "Physics Lab Manual.pdf", date: "1 week ago" },
              ].map((file, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{file.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{file.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Materials</CardTitle>
            <CardDescription>Your recently generated materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Biology Quiz", type: "Test", date: "1 day ago" },
                { name: "Chemistry Homework", type: "Homework", date: "2 days ago" },
                { name: "Physics Flashcards", type: "Teaching Aid", date: "5 days ago" },
              ].map((material, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{material.name}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{material.type}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{material.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
