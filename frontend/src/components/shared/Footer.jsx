import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Logo & Description */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className='bg-gradient-to-br from-[#6B4EFF] to-[#5a3dd9] p-2 rounded-lg'>
                                <Briefcase className='w-5 h-5 text-white' />
                            </div>
                            <h1 className='text-[#6B4EFF] font-bold text-2xl'>
                                Career<span className='text-white'>Flow</span>
                            </h1>
                        </div>
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                            Your trusted platform for finding the perfect job. Search, apply, and grow your career with thousands of opportunities.
                        </p>
                        <div className="flex space-x-4">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-[#6B4EFF] rounded-full flex items-center justify-center transition-colors duration-200"
                            >
                                <FaFacebookF size={16} />
                            </a>
                            <a 
                                href="https://x.com/Prashant1102f" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-[#6B4EFF] rounded-full flex items-center justify-center transition-colors duration-200"
                            >
                                <FaTwitter size={16} />
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/prashant-mishra-p1102/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-[#6B4EFF] rounded-full flex items-center justify-center transition-colors duration-200"
                            >
                                <FaLinkedinIn size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to='/' className="text-gray-300 hover:text-[#6B4EFF] transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#6B4EFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/jobs' className="text-gray-300 hover:text-[#6B4EFF] transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#6B4EFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to='/browse' className="text-gray-300 hover:text-[#6B4EFF] transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#6B4EFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Search Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to='/about' className="text-gray-300 hover:text-[#6B4EFF] transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#6B4EFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to='/atsScore' className="text-gray-300 hover:text-[#6B4EFF] transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#6B4EFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    ATS Score Checker
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-[#6B4EFF] transition-colors duration-200">
                                    Career Tips
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-[#6B4EFF] transition-colors duration-200">
                                    Resume Builder
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-[#6B4EFF] transition-colors duration-200">
                                    Interview Prep
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-[#6B4EFF] transition-colors duration-200">
                                    Job Alerts
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-[#6B4EFF] transition-colors duration-200">
                                    Help Center
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Get in Touch</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-gray-300">
                                <Mail className="w-5 h-5 text-[#6B4EFF] mt-0.5 flex-shrink-0" />
                                <a href="mailto:careerflow@example.com" className="hover:text-[#6B4EFF] transition-colors">
                                    careerflow@example.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <Phone className="w-5 h-5 text-[#6B4EFF] mt-0.5 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <MapPin className="w-5 h-5 text-[#6B4EFF] mt-0.5 flex-shrink-0" />
                                <span>123 Career Street, Job City, JC 12345</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} <span className="text-[#6B4EFF] font-semibold">CareerFlow</span>. All rights reserved.
                        </div>
                        <div className="flex gap-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-[#6B4EFF] transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-[#6B4EFF] transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-[#6B4EFF] transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer