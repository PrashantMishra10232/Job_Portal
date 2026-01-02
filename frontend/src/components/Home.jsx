import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from "./CategoryCarousel"
import LatestJobs from './LatestJobs'
import StatsSection from './StatsSection'
import FeaturedCompanies from './FeaturedCompanies'
import BenefitsSection from './BenefitsSection'
import JobByLocation from './JobByLocation'
import CTASection from './CTASection'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  useEffect(() => {
    if (user?.role === "Recruiter") {
      // navigate("/admin/Companies")
      navigate("/admin/dashboard")
    }
  })
  useGetAllJobs();
  useGetAllCompanies();
  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white'>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <CategoryCarousel />
      <LatestJobs />
      <FeaturedCompanies />
      <JobByLocation />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Home