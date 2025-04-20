"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, ArrowLeft, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { type FormEvent, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const navigate = useNavigate()

  // Check password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    
    // Length check
    if (password.length >= 8) strength += 1
    
    // Contains number
    if (/\d/.test(password)) strength += 1
    
    // Contains special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1
    
    // Contains uppercase and lowercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1
    
    setPasswordStrength(strength)
  }, [password])

  // Get password strength color and text
  const getStrengthDetails = () => {
    switch (passwordStrength) {
      case 0:
        return { color: "bg-gray-200", text: "Too weak" }
      case 1:
        return { color: "bg-red-500", text: "Weak" }
      case 2:
        return { color: "bg-yellow-500", text: "Fair" }
      case 3:
        return { color: "bg-green-500", text: "Good" }
      case 4:
        return { color: "bg-green-600", text: "Strong" }
      default:
        return { color: "bg-gray-200", text: "" }
    }
  }

  const validateForm = () => {
    // Reset error
    setError("")

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return false
    }

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return false
    }

    // Password strength validation
    if (passwordStrength < 2) {
      setError("Please use a stronger password")
      return false
    }

    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate a delay for the loading state to be visible
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // For demo purposes, we'll just redirect to login
      // In a real app, this would connect to your backend
      navigate("/login")
      
      // Commented out real implementation
      /* 
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        navigate("/login")
      } else {
        setError(data.message || "Registration failed. Please try again.")
      }
      */
    } catch (error) {
      console.error("Registration error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const strengthDetails = getStrengthDetails()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Link
        to="/"
        className="absolute top-4 left-4 p-2 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        <span>Back</span>
      </Link>
      <Card className="w-full max-w-md border-2 shadow-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your information to create an account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="Michael"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Scott"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="focus:border-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m.scott@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 focus:border-primary"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Password strength:</span>
                    <span className="text-xs font-medium">{strengthDetails.text}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strengthDetails.color} transition-all duration-300 ease-in-out`} 
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <CheckCircle className={`h-3 w-3 mr-1 ${password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <CheckCircle className={`h-3 w-3 mr-1 ${/\d/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span>Contains a number</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <CheckCircle className={`h-3 w-3 mr-1 ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span>Upper & lowercase</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <CheckCircle className={`h-3 w-3 mr-1 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span>Special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`pr-10 focus:border-primary ${confirmPassword && password !== confirmPassword ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-sm text-red-500 mt-1">Passwords don't match</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full" 
              type="submit" 
              disabled={isLoading || !firstName || !lastName || !email || !password || !confirmPassword}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
