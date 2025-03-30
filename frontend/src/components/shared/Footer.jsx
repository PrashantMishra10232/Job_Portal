import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";


function Footer() {
    return (
        <footer className="bg-gradient-to-br from-purple-800 to-gray-900 text-white p-6 py-8">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Logo & Description */}
                <div>
                    <h1 className='text-blue-600 font-bold text-xl'>
                        Chakri<span className='text-[#F83002]'>Portal</span>
                    </h1>
                    <p className="text-sm mt-2 text-gray-400">
                        Your trusted platform for finding the perfect job. Search, apply, and grow your career.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="mt-2 space-y-2 text-gray-400">
                        <li><a href="/jobs" className="hover:text-white">Browse Jobs</a></li>
                        <li><a href="/about" className="hover:text-white">About Us</a></li>
                        <li><a href="/contact" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex mt-3 space-x-4">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-white"><FaFacebookF size={20} /></a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-white"><FaLinkedinIn size={20} /></a>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} JobPortal. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer