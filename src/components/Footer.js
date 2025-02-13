import React from "react"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">KSP Yarns</h3>
            <p>Providing high-quality yarns for all your textile needs since 1996</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-300 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-blue-300 transition-colors duration-200">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-300 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-300 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors duration-200">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2025 KSP Yarns. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

