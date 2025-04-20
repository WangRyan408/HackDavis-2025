"use client"

import { Link, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, GraduationCap, LayoutDashboard, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import NoteNooksLogo from "/src/assets/NoteNooks_Logo.png"

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token")
    // Redirect to login page
    navigate("/")
  }

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <img src={NoteNooksLogo} alt="NoteNooks Logo" className="h-6 w-6" />
          <span className="text-xl font-bold text-[#2BAEA1]">NoteNooks</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1">
        <Link to="/dashboard">
          <Button 
            variant={isActive("/dashboard") ? "secondary" : "ghost"} 
            className={`w-full justify-start gap-2 ${isActive("/dashboard") ? "bg-[#DAFFF9] text-[#2BAEA1]" : "hover:bg-[#DAFFF9] hover:text-[#2BAEA1]"} transition-all duration-200 hover:translate-y-[-2px]`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link to="/files">
          <Button 
            variant={isActive("/files") ? "secondary" : "ghost"} 
            className={`w-full justify-start gap-2 ${isActive("/files") ? "bg-[#DAFFF9] text-[#2BAEA1]" : "hover:bg-[#DAFFF9] hover:text-[#2BAEA1]"} transition-all duration-200 hover:translate-y-[-2px]`}
          >
            <FileText className="h-4 w-4" />
            Files
          </Button>
        </Link>
        <Link to="/materials">
          <Button 
            variant={isActive("/materials") ? "secondary" : "ghost"} 
            className={`w-full justify-start gap-2 ${isActive("/materials") ? "bg-[#DAFFF9] text-[#2BAEA1]" : "hover:bg-[#DAFFF9] hover:text-[#2BAEA1]"} transition-all duration-200 hover:translate-y-[-2px]`}
          >
            <BookOpen className="h-4 w-4" />
            Course Materials
          </Button>
        </Link>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Jane Doe</p>
              <p className="text-xs text-muted-foreground">jane@example.com</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="hover:bg-[#DAFFF9] hover:text-[#2BAEA1] transition-all duration-200 hover:translate-y-[-2px]"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
