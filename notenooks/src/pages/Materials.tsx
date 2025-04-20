import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookOpen, Download, FileText, GraduationCap } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { GenerateMaterialsDialog } from "@/components/GenerateMaterialsDialog"

export default function Materials() {

  // Sample data - in a real app, this would come from an API
  const tests = [
    { name: "Biology Quiz", subject: "Biology", date: "1 day ago" },
    { name: "Chemistry Midterm", subject: "Chemistry", date: "1 week ago" },
    { name: "Physics Final", subject: "Physics", date: "2 weeks ago" },
    { name: "Math Assessment", subject: "Mathematics", date: "3 weeks ago" },
  ]

  const homework = [
    { name: "Biology Worksheet", subject: "Biology", date: "2 days ago" },
    { name: "Chemistry Problems", subject: "Chemistry", date: "5 days ago" },
    { name: "Physics Exercises", subject: "Physics", date: "1 week ago" },
  ]

  const teachingAids = [
    { name: "Biology Flashcards", subject: "Biology", date: "3 days ago" },
    { name: "Chemistry Diagrams", subject: "Chemistry", date: "1 week ago" },
    { name: "Physics Demonstrations", subject: "Physics", date: "2 weeks ago" },
    { name: "Math Concept Maps", subject: "Mathematics", date: "3 weeks ago" },
    { name: "History Timelines", subject: "History", date: "1 month ago" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[#1C7D73]">Course Materials</h1>
        <GenerateMaterialsDialog />
      </div>

      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#F0FEFA] border border-[#A7EFE4]">
          <TabsTrigger 
            value="tests" 
            className="data-[state=active]:bg-[#DAFFF9] data-[state=active]:text-[#2BAEA1] text-[#2A9E92] hover:text-[#2BAEA1] transition-all duration-200"
          >
            Tests
          </TabsTrigger>
          <TabsTrigger 
            value="homework" 
            className="data-[state=active]:bg-[#DAFFF9] data-[state=active]:text-[#2BAEA1] text-[#2A9E92] hover:text-[#2BAEA1] transition-all duration-200"
          >
            Homework
          </TabsTrigger>
          <TabsTrigger 
            value="teaching-aids" 
            className="data-[state=active]:bg-[#DAFFF9] data-[state=active]:text-[#2BAEA1] text-[#2A9E92] hover:text-[#2BAEA1] transition-all duration-200"
          >
            Teaching Aids
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="mt-6">
          <div className="rounded-md border border-[#A7EFE4] bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-[#F0FEFA]">
                <TableRow>
                  <TableHead className="text-[#1C7D73] font-semibold">Name</TableHead>
                  <TableHead className="text-[#1C7D73] font-semibold">Subject</TableHead>
                  <TableHead className="text-[#1C7D73] font-semibold">Created</TableHead>
                  <TableHead className="text-[#1C7D73] font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tests.map((material, index) => (
                  <TableRow key={index} className="hover:bg-[#F8FFFD] transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#DAFFF9] p-2 rounded-md">
                          <BookOpen className="h-4 w-4 text-[#2BAEA1]" />
                        </div>
                        <span className="font-medium text-[#1C7D73]">{material.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-[#F0FEFA] text-[#2BAEA1] border-[#A7EFE4]">{material.subject}</Badge>
                    </TableCell>
                    <TableCell className="text-[#2A9E92]">{material.date}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Download"
                        className="hover:bg-[#DAFFF9] hover:text-[#2BAEA1] transition-all duration-200 hover:translate-y-[-2px]"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="homework" className="mt-6">
          <div className="rounded-md border border-[#A7EFE4] bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-[#F0FEFA]">
                <TableRow>
                  <TableHead className="text-[#1C7D73] font-semibold">Name</TableHead>
                  <TableHead className="text-[#1C7D73] font-semibold">Subject</TableHead>
                  <TableHead className="text-[#1C7D73] font-semibold">Created</TableHead>
                  <TableHead className="text-[#1C7D73] font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {homework.map((material, index) => (
                  <TableRow key={index} className="hover:bg-[#F8FFFD] transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#DAFFF9] p-2 rounded-md">
                          <FileText className="h-4 w-4 text-[#2BAEA1]" />
                        </div>
                        <span className="font-medium text-[#1C7D73]">{material.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-[#F0FEFA] text-[#2BAEA1] border-[#A7EFE4]">{material.subject}</Badge>
                    </TableCell>
                    <TableCell className="text-[#2A9E92]">{material.date}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Download"
                        className="hover:bg-[#DAFFF9] hover:text-[#2BAEA1] transition-all duration-200 hover:translate-y-[-2px]"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="teaching-aids" className="mt-6">
          <div className="rounded-md border border-[#A7EFE4] bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-[#F0FEFA]">
                <TableRow>
                  <TableHead className="text-[#1C7D73] font-semibold">Name</TableHead>
                  <TableHead className="text-[#1C7D73] font-semibold">Subject</TableHead>
                  <TableHead className="text-[#1C7D73] font-semibold">Created</TableHead>
                  <TableHead className="text-[#1C7D73] font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachingAids.map((material, index) => (
                  <TableRow key={index} className="hover:bg-[#F8FFFD] transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#DAFFF9] p-2 rounded-md">
                          <GraduationCap className="h-4 w-4 text-[#2BAEA1]" />
                        </div>
                        <span className="font-medium text-[#1C7D73]">{material.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-[#F0FEFA] text-[#2BAEA1] border-[#A7EFE4]">{material.subject}</Badge>
                    </TableCell>
                    <TableCell className="text-[#2A9E92]">{material.date}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Download"
                        className="hover:bg-[#DAFFF9] hover:text-[#2BAEA1] transition-all duration-200 hover:translate-y-[-2px]"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
