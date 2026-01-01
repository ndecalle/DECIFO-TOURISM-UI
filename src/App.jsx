import { Routes, Route, useLocation } from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Destinations from "./pages/Destinations"
import CulturalExperiences from "./pages/CulturalExperiences"
import Tours from "./pages/Tours"
import Gallery from "./pages/Gallery"
import Contact from "./pages/Contact"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import ScrollToTopButton from "./components/ui/ScrollToTopButton"
import PrivateRoute from './components/auth/PrivateRoute'
import AdminRoute from './components/auth/AdminRoute'
import AnalyticsTracker from "./components/AnalyticsTracker"

import ScrollToTop from "./utils/scrollToTop"
import { ThemeProvider } from "./context/ThemeContext"
import { LanguageProvider } from "./context/LanguageContext"

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <LanguageProvider>
      <ThemeProvider>
          <ScrollToTop />
          <AnalyticsTracker />
          <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Navbar />}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/cultural-experiences" element={<CulturalExperiences />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<PrivateRoute><AdminRoute><AdminDashboard /></AdminRoute></PrivateRoute>} />
              </Routes>
            </main>
            {!isAdminRoute && <Footer />}
          </div>
          <ScrollToTopButton threshold={300} />
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App

