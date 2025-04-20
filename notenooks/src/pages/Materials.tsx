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
        <h1 className="text-3xl font-bold tracking-tight">Course Materials</h1>
        <GenerateMaterialsDialog />
      </div>

      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="homework">Homework</TabsTrigger>
          <TabsTrigger value="teaching-aids">Teaching Aids</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tests.map((material, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{material.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{material.subject}</Badge>
                    </TableCell>
                    <TableCell>{material.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" title="Download">
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {homework.map((material, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{material.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{material.subject}</Badge>
                    </TableCell>
                    <TableCell>{material.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" title="Download">
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachingAids.map((material, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{material.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{material.subject}</Badge>
                    </TableCell>
                    <TableCell>{material.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" title="Download">
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
