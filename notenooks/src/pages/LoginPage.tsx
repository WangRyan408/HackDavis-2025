"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, ArrowLeft } from "lucide-react"
import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import NoteNooksLogo from "/src/assets/NoteNooks_Logo.png"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // const response = await fetch("http://localhost:5000/api/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      //   credentials: "include",
      // })

      // const data = await response.json()

       if (email === 'user@example.com' && password === '1234') {
      //   // Store token in localStorage
      //localStorage.setItem("token", data.token)
        navigate("/dashboard")
      } else {
        // Handle error
        //console.error("Login failed:", data.message)
      }
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#DAFFF9]">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <img className="h-16 w-auto" src={NoteNooksLogo} alt="NoteNooks" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#1C7D73]">Login to your account</h2>
            <p className="mt-2 text-sm text-[#2A9E92]">
              Or{" "}
              <Link to="/register" className="font-medium text-[#2BAEA1] hover:underline transition-all duration-200 hover:text-[#239085]">
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1C7D73]">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-[#A7EFE4] px-3 py-2 shadow-sm focus:border-[#2BAEA1] focus:outline-none focus:ring-1 focus:ring-[#2BAEA1]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-[#1C7D73]">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-[#A7EFE4] px-3 py-2 shadow-sm focus:border-[#2BAEA1] focus:outline-none focus:ring-1 focus:ring-[#2BAEA1]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#A7EFE4] text-[#2BAEA1] focus:ring-[#2BAEA1]"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#1C7D73]">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-[#2BAEA1] hover:text-[#239085] transition-all duration-200">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="flex w-full justify-center bg-[#2BAEA1] text-white hover:bg-[#239085] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md"
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#DAFFF9] to-[#2BAEA1]/60">
          <div className="flex h-full items-center justify-center">
            <div className="px-8 text-center">
              <h1 className="text-4xl font-bold text-[#1C7D73] drop-shadow-md">Organize your teaching resources</h1>
              <p className="mt-4 text-xl text-[#1C7D73]">Access your materials anytime, anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
