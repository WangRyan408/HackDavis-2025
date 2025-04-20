import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardLayout from "./layouts/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Files from "./pages/Files"
import Materials from "./pages/Materials"
import { ThemeProvider } from "./components/ThemeProvider"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="teachassist-theme">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/files"
            element={
              <DashboardLayout>
                <Files />
              </DashboardLayout>
            }
          />
          <Route
            path="/materials"
            element={
              <DashboardLayout>
                <Materials />
              </DashboardLayout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
