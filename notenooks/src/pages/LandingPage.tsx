import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, FileText, GraduationCap, Plus, Minus } from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "How does TeachAssist generate course materials?",
      answer: "TeachAssist uses advanced AI to analyze your uploaded PDFs and course materials. It then generates tests, quizzes, homework assignments, and teaching aids based on the content, saving you time and effort in creating these materials yourself."
    },
    {
      question: "Is my content secure when I upload it?",
      answer: "Yes, all your uploaded content is securely stored with encryption. We do not share your materials with third parties, and your content remains your intellectual property at all times."
    },
    {
      question: "What file formats are supported?",
      answer: "Currently, TeachAssist supports PDF files. We use OCR technology to convert PDFs to searchable text, even if they contain scanned pages or images."
    },
    {
      question: "Can I edit the generated materials?",
      answer: "Absolutely! All generated materials can be fully edited to suit your specific needs. You can customize questions, reorganize content, and make any changes before finalizing your materials."
    },
    {
      question: "Does TeachAssist offer a free trial?",
      answer: "Yes, we offer a free tier that allows you to try our core features with limited usage. You can upgrade to a premium plan anytime to access additional features and higher usage limits."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-6">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">TeachAssist</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
      <section className="py-20 md:py-32 w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="ml-6 flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Generate Course Materials with AI
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Upload your PDFs and let our AI generate tests, homework, and teaching aids to save you time and
                    enhance your teaching.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/register">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-950/30 dark:to-indigo-950/30 p-1">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <p className="text-lg font-medium">Transform your teaching materials</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 bg-muted w-full">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers powerful tools to help teachers create better course materials faster.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">PDF Upload & Processing</h3>
                <p className="text-center text-muted-foreground">
                  Upload your PDFs and our system will convert them to searchable text using advanced OCR technology.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI-Generated Materials</h3>
                <p className="text-center text-muted-foreground">
                  Generate tests, homework assignments, and teaching aids based on your uploaded content.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Organized Content</h3>
                <p className="text-center text-muted-foreground">
                  Keep all your teaching materials organized in one place with easy access and management.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-12 md:py-24 w-full">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about TeachAssist
                </p>
              </div>
            </div>
            
            <div className="mx-auto max-w-3xl divide-y">
              {faqs.map((faq, index) => (
                <div key={index} className="py-6">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full justify-between items-center text-left"
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    {openFAQ === index ? (
                      <Minus className="h-5 w-5 text-primary" />
                    ) : (
                      <Plus className="h-5 w-5 text-primary" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="mt-3 text-muted-foreground">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 TeachAssist. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
