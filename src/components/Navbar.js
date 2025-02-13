"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaShoppingCart,
  FaYarn,
  FaInfoCircle,
  FaEnvelope,
  FaHome,
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Navbar = ({ cart = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", icon: <FaHome className="mr-2" />, text: "Home" },
    { href: "/products", icon: <FaShoppingCart className="mr-2" />, text: "Products" },
    { href: "/about", icon: <FaInfoCircle className="mr-2" />, text: "About" },
    { href: "/contact", icon: <FaEnvelope className="mr-2" />, text: "Contact" },
  ]

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white text-gray-800 shadow-md" : "bg-transparent text-white"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <FaYarn className="text-3xl text-blue-600" />
          <span className="text-2xl font-bold">KSP Yarns</span>
        </Link>

        <nav className="hidden md:flex space-x-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                pathname === link.href ? "bg-blue-600 text-white" : "hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {link.icon}
              {link.text}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
            <FaSearch />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="User menu">
                <FaUser />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" className="relative" aria-label="Cart">
            <FaShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </Button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                    pathname === link.href ? "bg-blue-600 text-white" : "hover:bg-blue-100 hover:text-blue-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.text}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="justify-start"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <FaSearch className="mr-2" /> Search
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <FaUser className="mr-2" /> Profile
              </Button>
              <Button variant="ghost" size="sm" className="justify-start relative">
                <FaShoppingCart className="mr-2" /> Cart
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-white shadow-md p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <input type="text" placeholder="Search..." className="w-full p-2 border rounded-md" autoFocus />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar

