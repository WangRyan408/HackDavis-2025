import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, FileText, GraduationCap, Check, LucideIcon, BarChart3, Zap, Clock, Brain, Plus, Minus } from "lucide-react"
import NoteNooksLogo from "/src/assets/NoteNooks_Logo.png"
import { useEffect, useState } from "react"

// Custom animated background component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      
      {/* Animated wave effect */}
      <div className="wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
      </div>
    </div>
  )
}

// Benefit Card component
interface BenefitCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const BenefitCard = ({ title, description, icon: Icon }: BenefitCardProps) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-[#A7EFE4] transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
    <div className="mb-4 p-3 bg-[#DAFFF9] rounded-full">
      <Icon className="h-8 w-8 text-[#2BAEA1]" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-[#1C7D73]">{title}</h3>
    <p className="text-center text-[#2A9E92]">{description}</p>
  </div>
);

// Pricing Card component
interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const PricingCard = ({ title, price, description, features, highlighted = false }: PricingCardProps) => (
  <div className={`flex flex-col p-6 rounded-xl border ${highlighted ? 'bg-[#F0FEFA] border-[#2BAEA1] shadow-md' : 'bg-white border-[#A7EFE4] shadow-sm'} transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]`}>
    <h3 className={`text-xl font-bold mb-2 ${highlighted ? 'text-[#2BAEA1]' : 'text-[#1C7D73]'}`}>{title}</h3>
    <div className="mb-4">
      <span className="text-3xl font-bold text-[#1C7D73]">{price}</span>
      {price !== "Free" && <span className="text-[#2A9E92]">/month</span>}
    </div>
    <p className="mb-6 text-[#2A9E92]">{description}</p>
    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Check className={`h-5 w-5 mr-2 ${highlighted ? 'text-[#2BAEA1]' : 'text-[#2A9E92]'}`} />
          <span className="text-[#1C7D73]">{feature}</span>
        </li>
      ))}
    </ul>
    <Button 
      className={`mt-auto ${highlighted ? 'bg-[#2BAEA1] hover:bg-[#239085]' : 'bg-black hover:bg-black/80'} text-white transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md`}
    >
      Get Started
    </Button>
  </div>
);

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "How does NoteNooks generate course materials?",
      answer: "NoteNooks uses advanced AI to analyze your uploaded PDFs and course materials. It then generates tests, quizzes, homework assignments, and teaching aids based on the content, saving you time and effort in creating these materials yourself."
    },
    {
      question: "Is my content secure when I upload it?",
      answer: "Yes, all your uploaded content is securely stored with encryption. We do not share your materials with third parties, and your content remains your intellectual property at all times."
    },
    {
      question: "What file formats are supported?",
      answer: "Currently, NoteNooks supports PDF files. We use OCR technology to convert PDFs to searchable text, even if they contain scanned pages or images."
    },
    {
      question: "Can I edit the generated materials?",
      answer: "Absolutely! All generated materials can be fully edited to suit your specific needs. You can customize questions, reorganize content, and make any changes before finalizing your materials."
    },
    {
      question: "Does NoteNooks offer a free trial?",
      answer: "Yes, we offer a free tier that allows you to try our core features with limited usage. You can upgrade to a premium plan anytime to access additional features and higher usage limits."
    }
  ]

  // Add scroll handling for navigation and parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Update active section based on scroll position
      const sections = ["home", "features", "how-it-works", "benefits", "pricing", "faq"]
      const sectionElements = sections.map(id => document.getElementById(id))
      
      sectionElements.forEach((section, index) => {
        if (!section) return
        
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(sections[index])
        }
      })
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#DAFFF9] relative">
      {/* Add animated shapes CSS */}
      <style jsx="true">{
        /* Animated blob effects */
        `.blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
          animation: blob-movement 18s infinite alternate ease-in-out;
        }
        
        .blob-1 {
          width: 300px;
          height: 300px;
          background-color: rgba(43, 174, 161, 0.3);
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }
        
        .blob-2 {
          width: 350px;
          height: 350px;
          background-color: rgba(167, 239, 228, 0.4);
          top: 40%;
          right: 15%;
          animation-delay: -3s;
        }
        
        .blob-3 {
          width: 250px;
          height: 250px;
          background-color: rgba(200, 255, 246, 0.5);
          bottom: 15%;
          left: 35%;
          animation-delay: -5s;
        }
        
        @keyframes blob-movement {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(5%, 5%) scale(1.1);
          }
          66% {
            transform: translate(-5%, 2%) scale(0.9);
          }
          100% {
            transform: translate(5%, -5%) scale(1);
          }
        }
        
        /* Wave animation */
        .wave-container {
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          height: 100px;
          overflow: hidden;
        }
        
        .wave {
          position: absolute;
          width: 200%;
          height: 100%;
          bottom: 0;
          left: 0;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%2370DDC7'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%2390EAD8'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23B0F4E9'/%3E%3C/svg%3E");
          background-size: 100% 100px;
          animation: wave-animation 12s linear infinite;
        }
        
        .wave1 {
          animation-delay: 0s;
          z-index: 1;
        }
        
        .wave2 {
          animation-delay: -5s;
          opacity: 0.5;
          z-index: 0;
        }
        
        @keyframes wave-animation {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Circular navigation styles */
        .nav-pill {
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-pill.active {
          background-color: #DAFFF9;
          color: #2BAEA1;
        }

        .nav-pill.active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #2BAEA1;
        }

        .nav-container {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(167, 239, 228, 0.4);
        }`
      }</style>

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
        <nav className="nav-container rounded-full flex items-center justify-between px-6 py-3 shadow-md bg-white/90 backdrop-blur-sm border border-[#A7EFE4]/60 max-w-6xl w-full">
          {/* Logo and Title - Left Side */}
          <div className="flex items-center gap-2 pr-4">
            <img src={NoteNooksLogo} alt="NoteNooks Logo" className="h-9 w-auto object-contain" />
            <span className="text-xl font-bold text-[#2BAEA1]">NoteNooks</span>
          </div>
          
          {/* Navigation Links - Center */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => scrollToSection('features')}
              className={`nav-pill px-4 py-2 rounded-full text-base font-medium ${activeSection === 'features' ? 'active' : 'text-[#1C7D73] hover:bg-[#F0FEFA]'} transition-all duration-200 hover:translate-y-[-1px]`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className={`nav-pill px-4 py-2 rounded-full text-base font-medium ${activeSection === 'how-it-works' ? 'active' : 'text-[#1C7D73] hover:bg-[#F0FEFA]'} transition-all duration-200 hover:translate-y-[-1px]`}
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('benefits')}
              className={`nav-pill px-4 py-2 rounded-full text-base font-medium ${activeSection === 'benefits' ? 'active' : 'text-[#1C7D73] hover:bg-[#F0FEFA]'} transition-all duration-200 hover:translate-y-[-1px]`}
            >
              Benefits
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className={`nav-pill px-4 py-2 rounded-full text-base font-medium ${activeSection === 'pricing' ? 'active' : 'text-[#1C7D73] hover:bg-[#F0FEFA]'} transition-all duration-200 hover:translate-y-[-1px]`}
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className={`nav-pill px-4 py-2 rounded-full text-base font-medium ${activeSection === 'faq' ? 'active' : 'text-[#1C7D73] hover:bg-[#F0FEFA]'} transition-all duration-200 hover:translate-y-[-1px]`}
            >
              FAQ
            </button>
          </div>
          
          {/* Login and Register - Right Side */}
          <div className="flex items-center gap-3 pl-4">
            <Link to="/login">
              <Button variant="ghost" className="text-[#2BAEA1] hover:text-[#239085] hover:bg-[#DAFFF9] transition-all duration-200 hover:translate-y-[-1px] text-base font-medium px-5">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-black hover:bg-black/80 text-white transition-all duration-200 hover:translate-y-[-1px] hover:shadow-md text-base font-medium px-5">Register</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 pt-16"> {/* Added padding-top to account for fixed header */}
        {/* Hero Section */}
        <section id="home" className="py-20 md:py-32 w-full relative overflow-hidden">
          {/* Add the animated background */}
          <AnimatedBackground />
          
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="ml-6 flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#1C7D73] drop-shadow-sm animate-fadeIn">
                    Generate Course Materials with AI
                  </h1>
                  <p className="max-w-[600px] text-[#2A9E92] md:text-xl animate-slideUp">
                    Upload your PDFs and let our AI generate tests, homework, and teaching aids to save you time and
                    enhance your teaching.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row animate-fadeIn" style={{ animationDelay: "0.3s" }}>
                  <Link to="/register">
                    <Button size="lg" className="gap-1.5 bg-black hover:bg-black/80 text-white shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <button onClick={() => scrollToSection('features')}>
                    <Button size="lg" variant="outline" className="border-[#2BAEA1] text-[#2BAEA1] hover:bg-[#E7FFF9] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
                      Learn More
                    </Button>
                  </button>
                </div>
              </div>
              <div className="flex justify-center animate-float">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl bg-white/70 backdrop-blur-sm p-1 shadow-lg border border-[#A7EFE4] transition-all duration-200 hover:shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-16 w-16 mx-auto mb-4 text-[#2BAEA1]" />
                      <p className="text-lg font-medium text-[#1C7D73]">Transform your teaching materials</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-24 bg-white w-full relative z-10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1C7D73]">Features</h2>
                <p className="max-w-[900px] text-[#2A9E92] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers powerful tools to help teachers create better course materials faster.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-[#F0FEFA] shadow-sm border border-[#A7EFE4] transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DAFFF9]">
                  <FileText className="h-8 w-8 text-[#2BAEA1]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C7D73]">PDF Upload & Processing</h3>
                <p className="text-center text-[#2A9E92]">
                  Upload your PDFs and our system will convert them to searchable text using advanced OCR technology.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-[#F0FEFA] shadow-sm border border-[#A7EFE4] transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DAFFF9]">
                  <BookOpen className="h-8 w-8 text-[#2BAEA1]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C7D73]">AI-Generated Materials</h3>
                <p className="text-center text-[#2A9E92]">
                  Generate tests, homework assignments, and teaching aids based on your uploaded content.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-[#F0FEFA] shadow-sm border border-[#A7EFE4] transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DAFFF9]">
                  <GraduationCap className="h-8 w-8 text-[#2BAEA1]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C7D73]">Organized Content</h3>
                <p className="text-center text-[#2A9E92]">
                  Keep all your teaching materials organized in one place with easy access and management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 md:py-24 bg-[#DAFFF9] w-full relative z-10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1C7D73]">How It Works</h2>
                <p className="max-w-[900px] text-[#2A9E92] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  NoteNooks simplifies the process of creating quality teaching materials in just a few steps.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md mb-2">
                    <FileText className="h-8 w-8 text-[#2BAEA1]" />
                  </div>
                  <div className="absolute top-7 left-full w-full h-0.5 bg-[#A7EFE4] hidden md:block"></div>
                  <div className="w-8 h-8 rounded-full bg-[#2BAEA1] text-white flex items-center justify-center font-bold absolute -top-2 -right-2">1</div>
                </div>
                <h3 className="text-lg font-bold text-[#1C7D73] mb-2">Upload Content</h3>
                <p className="text-[#2A9E92]">Upload your lecture notes, textbooks, or any educational PDFs to our platform.</p>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md mb-2">
                    <Brain className="h-8 w-8 text-[#2BAEA1]" />
                  </div>
                  <div className="absolute top-7 left-full w-full h-0.5 bg-[#A7EFE4] hidden md:block"></div>
                  <div className="w-8 h-8 rounded-full bg-[#2BAEA1] text-white flex items-center justify-center font-bold absolute -top-2 -right-2">2</div>
                </div>
                <h3 className="text-lg font-bold text-[#1C7D73] mb-2">AI Processing</h3>
                <p className="text-[#2A9E92]">Our AI analyzes your content and extracts key concepts, facts, and learning objectives.</p>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md mb-2">
                    <BookOpen className="h-8 w-8 text-[#2BAEA1]" />
                  </div>
                  <div className="absolute top-7 left-full w-full h-0.5 bg-[#A7EFE4] hidden md:block"></div>
                  <div className="w-8 h-8 rounded-full bg-[#2BAEA1] text-white flex items-center justify-center font-bold absolute -top-2 -right-2">3</div>
                </div>
                <h3 className="text-lg font-bold text-[#1C7D73] mb-2">Generate Materials</h3>
                <p className="text-[#2A9E92]">Choose the type of materials you need, and our AI will create them based on your content.</p>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md mb-2">
                    <FileText className="h-8 w-8 text-[#2BAEA1]" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#2BAEA1] text-white flex items-center justify-center font-bold absolute -top-2 -right-2">4</div>
                </div>
                <h3 className="text-lg font-bold text-[#1C7D73] mb-2">Download & Use</h3>
                <p className="text-[#2A9E92]">Download your custom-generated materials, ready to use in your classroom or online teaching.</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-12">
              <Link to="/register">
                <Button className="gap-1.5 bg-black hover:bg-black/80 text-white shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
                  Try It Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-12 md:py-24 bg-white w-full relative z-10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1C7D73]">Benefits</h2>
                <p className="max-w-[900px] text-[#2A9E92] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover how NoteNooks can transform your teaching experience.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BenefitCard
                title="Save Time"
                description="Reduce the hours spent creating materials by up to 70%. Focus on teaching, not paperwork."
                icon={Clock}
              />
              <BenefitCard
                title="Improve Quality"
                description="Generate materials based on educational best practices and your specific content."
                icon={BarChart3}
              />
              <BenefitCard
                title="Increase Engagement"
                description="Create diverse, engaging materials that cater to different learning styles."
                icon={Zap}
              />
              <BenefitCard
                title="Stay Organized"
                description="Keep all your teaching resources in one place, easily accessible when you need them."
                icon={FileText}
              />
              <BenefitCard
                title="Personalize Learning"
                description="Customize materials for different student needs and learning objectives."
                icon={GraduationCap}
              />
              <BenefitCard
                title="Enhance Accessibility"
                description="Create materials that are accessible to all students, regardless of their learning needs."
                icon={BookOpen}
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-12 md:py-24 bg-[#F0FEFA] w-full relative z-10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1C7D73]">Pricing</h2>
                <p className="max-w-[900px] text-[#2A9E92] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that fits your needs. No hidden fees.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                title="Basic"
                price="Free"
                description="Perfect for trying out NoteNooks."
                features={[
                  "5 PDF uploads per month",
                  "Generate up to 10 materials",
                  "Basic AI generation",
                  "Standard support"
                ]}
              />
              <PricingCard
                title="Professional"
                price="$29"
                description="Ideal for individual educators."
                features={[
                  "Unlimited PDF uploads",
                  "Generate up to 100 materials",
                  "Advanced AI generation",
                  "Priority support",
                  "Custom templates"
                ]}
                highlighted={true}
              />
              <PricingCard
                title="Institution"
                price="$99"
                description="For schools and educational institutions."
                features={[
                  "Unlimited PDF uploads",
                  "Unlimited material generation",
                  "Premium AI generation",
                  "24/7 dedicated support",
                  "Custom branding",
                  "User management"
                ]}
              />
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-[#2A9E92] mb-4">Need a custom plan for your organization?</p>
              <Button variant="outline" className="border-[#2BAEA1] text-[#2BAEA1] hover:bg-[#E7FFF9] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
                Contact Us
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 md:py-24 bg-white w-full relative z-10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1C7D73]">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-[#2A9E92] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about NoteNooks
                </p>
              </div>
            </div>
            
            <div className="mx-auto max-w-3xl divide-y divide-[#A7EFE4]">
              {faqs.map((faq, index) => (
                <div key={index} className="py-6">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full justify-between items-center text-left"
                  >
                    <h3 className="text-lg font-medium text-[#1C7D73]">{faq.question}</h3>
                    {openFAQ === index ? (
                      <Minus className="h-5 w-5 text-[#2BAEA1]" />
                    ) : (
                      <Plus className="h-5 w-5 text-[#2BAEA1]" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="mt-3 text-[#2A9E92]">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0 bg-[#2BAEA1] text-white relative z-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm">© 2025 NoteNooks. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms" className="text-sm hover:underline">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}