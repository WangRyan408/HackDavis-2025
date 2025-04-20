import type { ReactNode } from "react"
import Sidebar from "@/components/Sidebar"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 bg-[#F8FFFD]">{children}</main>
    </div>
  )
}
