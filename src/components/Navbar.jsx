"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useTranslation } from "../utils/i18n"
import LanguageSelector from "./LanguageSelector"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const activeLinkClass = "text-green-500 font-semibold border-b-2 border-green-500 pb-1 text-sm"
  const inactiveLinkClass = "text-gray-700 hover:text-green-700 font-medium hover:border-b-2 hover:border-green-700 pb-1 text-sm"

  return (
    <>
      <header data-reveal className="reveal bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50"> {/* Added dark mode styles */}
        <div className="container mx-auto px-3 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto rounded-md" />
            </Link>


            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className={isActive("/") ? activeLinkClass : inactiveLinkClass}>
                  {t("nav.home")}
                </Link>
                <Link to="/about" className={isActive("/about") ? activeLinkClass : inactiveLinkClass}>
                  {t("nav.about")}
                </Link>
                <Link to="/destinations" className={isActive("/destinations") ? activeLinkClass : inactiveLinkClass}>
                  {t("nav.destinations")}
                </Link>
                <Link
                  to="/cultural-experiences"
                  className={isActive("/cultural-experiences") ? activeLinkClass : inactiveLinkClass}
                >
                  {t("nav.culturalExperiences")}
                </Link>
                <Link to="/tours" className={isActive("/tours") ? activeLinkClass : inactiveLinkClass}>
                  {t("nav.tours")}
                </Link>
                <Link to="/gallery" className={isActive("/gallery") ? activeLinkClass : inactiveLinkClass}>
                  {t("nav.gallery")}
                </Link>
                <Link to="/contact" className={isActive("/contact") ? activeLinkClass : inactiveLinkClass}>
                  {t("nav.contact")}
                </Link>
                <Link to="/blog" className={isActive("/blog") ? activeLinkClass : inactiveLinkClass}>
                  {t("nav.blog")}
                </Link>

              </nav>

              <div className="hidden md:flex items-center space-x-1">
                <LanguageSelector />
                <ThemeToggle />
              </div>

              <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="ml-2 text-gray-700 dark:text-gray-300">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>


          {/* Business Hours Marquee */}
          <div className="mt-2 text-sm text-green-900">
            <marquee behavior="scroll" direction="left" scrollamount="1">
              Business Hours: Monday - Friday: 8:00 AM - 6:00 PM | Saturday: 9:00 AM - 4:00 PM | Sunday: Closed
            </marquee>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-60 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMenu}></div>
        <nav className={`absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full p-4">
            <button onClick={toggleMenu} className="self-end mb-4 text-gray-700 dark:text-gray-300">
              <X size={24} />
            </button>
            <div className="flex-1 space-y-4">
              <Link to="/" className={isActive("/") ? activeLinkClass : inactiveLinkClass} onClick={toggleMenu}>
                {t("nav.home")}
              </Link>
              <Link to="/about" className={isActive("/about") ? activeLinkClass : inactiveLinkClass} onClick={toggleMenu}>
                {t("nav.about")}
              </Link>
              <Link to="/destinations" className={isActive("/destinations") ? activeLinkClass : inactiveLinkClass} onClick={toggleMenu}>
                {t("nav.destinations")}
              </Link>
              <Link to="/cultural-experiences" className={isActive("/cultural-experiences") ? activeLinkClass : inactiveLinkClass} onClick={toggleMenu}>
                {t("nav.culturalExperiences")}
              </Link>
              <Link to="/tours" className={isActive("/tours") ? activeLinkClass : inactiveLinkClass} onClick={toggleMenu}>
                {t("nav.tours")}
              </Link>
              <Link to="/gallery" className={isActive("/gallery") ? activeLinkClass : inactiveLinkClass} onClick={toggleMenu}>
                {t("nav.gallery")}
              </Link>
              <Link to="/contact" className={isActive("/contact") ? activeLinkClass : inactiveLinkClass} onClick={toggleMenu}>
                {t("nav.contact")}
              </Link>
              <Link to="/blog" className={isActive("/blog") ? activeLinkClass : inactiveLinkClass} onClick={toggleMenu}>
                {t("nav.blog")}
              </Link>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar