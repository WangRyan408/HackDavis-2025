//import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, GraduationCap } from "lucide-react"
import { GenerateMaterialsDialog } from "@/components/GenerateMaterialsDialog"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[#1C7D73]">Dashboard</h1>
        <GenerateMaterialsDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-[#A7EFE4] hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-[#2BAEA1]">Total Files</CardTitle>
            <FileText className="h-4 w-4 text-[#2BAEA1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1C7D73]">12</div>
            <p className="text-xs text-[#2A9E92]">+2 from last week</p>
          </CardContent>
        </Card>
        <Card className="border-[#A7EFE4] hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-[#2BAEA1]">Generated Tests</CardTitle>
            <BookOpen className="h-4 w-4 text-[#2BAEA1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1C7D73]">8</div>
            <p className="text-xs text-[#2A9E92]">+3 from last week</p>
          </CardContent>
        </Card>
        <Card className="border-[#A7EFE4] hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-[#2BAEA1]">Teaching Aids</CardTitle>
            <GraduationCap className="h-4 w-4 text-[#2BAEA1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1C7D73]">5</div>
            <p className="text-xs text-[#2A9E92]">+1 from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-[#A7EFE4] hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-[#1C7D73]">Recent Files</CardTitle>
            <CardDescription className="text-[#2A9E92]">Your recently uploaded files</CardDescription>
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
                    <FileText className="h-4 w-4 text-[#2BAEA1]" />
                    <span className="text-[#1C7D73]">{file.name}</span>
                  </div>
                  <span className="text-sm text-[#2A9E92]">{file.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#A7EFE4] hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-[#1C7D73]">Recent Materials</CardTitle>
            <CardDescription className="text-[#2A9E92]">Your recently generated materials</CardDescription>
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
                    <BookOpen className="h-4 w-4 text-[#2BAEA1]" />
                    <span className="text-[#1C7D73]">{material.name}</span>
                    <span className="text-xs bg-[#DAFFF9] text-[#2BAEA1] px-2 py-0.5 rounded-full">{material.type}</span>
                  </div>
                  <span className="text-sm text-[#2A9E92]">{material.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
