import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Target, Users, Zap, Heart, Award, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AboutUs = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const values = [
    {
      icon: <Target className='w-8 h-8' />,
      title: 'Our Mission',
      description: 'To bridge the gap between ambition and achievement by simplifying the hiring process for everyone, making career opportunities accessible to all.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: <Heart className='w-8 h-8' />,
      title: 'Our Vision',
      description: 'To become the world\'s most trusted job platform, where every professional finds their dream job and every company finds their perfect talent.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: <Award className='w-8 h-8' />,
      title: 'Our Values',
      description: 'We believe in transparency, innovation, and putting people first. Every decision we make is driven by our commitment to your success.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const features = [
    {
      icon: <Zap className='w-6 h-6' />,
      title: 'Lightning Fast',
      description: 'Quick job search and instant applications'
    },
    {
      icon: <CheckCircle2 className='w-6 h-6' />,
      title: 'Verified Jobs',
      description: 'All listings are verified for authenticity'
    },
    {
      icon: <TrendingUp className='w-6 h-6' />,
      title: 'Smart Matching',
      description: 'AI-powered job recommendations'
    },
    {
      icon: <Users className='w-6 h-6' />,
      title: 'Trusted Network',
      description: 'Connect with top employers worldwide'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Job Seekers' },
    { number: '500+', label: 'Companies' },
    { number: '5K+', label: 'Job Listings' },
    { number: '95%', label: 'Success Rate' }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Platform Launch',
      description: 'CareerFlow launched with a mission to revolutionize job searching'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Introduced ATS scoring and smart job matching features'
    },
    {
      year: '2024',
      title: 'Rapid Growth',
      description: 'Reached 10K+ users and 500+ companies on the platform'
    },
    {
      year: '2025',
      title: 'Future Goals',
      description: 'Expanding globally and adding more innovative features'
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold">About CareerFlow</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Connecting Talent with <span className='text-yellow-300'>Opportunity</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
            We're revolutionizing the way people find jobs and companies find talent. 
            Join thousands who have transformed their careers through CareerFlow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <Button
                onClick={() => navigate('/signup')}
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-xl"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/jobs')}
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-xl"
              >
                Browse Jobs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
            <Button
              onClick={() => navigate('/browse')}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-700 text-lg px-8 py-6 rounded-full"
            >
              Explore Opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What Drives <span className="text-[#6A38C2]">Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our core principles guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`${value.bgColor} ${value.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                What We <span className="text-[#6A38C2]">Do</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                CareerFlow is a next-generation job search platform designed to help professionals 
                and companies grow. We provide innovative tools and features that make job searching 
                and hiring simpler, smarter, and more effective.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 rounded-lg p-2 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-purple-600 text-white p-6 rounded-xl shadow-xl hidden md:block">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our <span className="text-[#6A38C2]">Journey</span>
            </h2>
            <p className="text-xl text-gray-600">Milestones in our growth story</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-purple-300 transform md:-translate-x-1/2"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-purple-600 font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-purple-600 rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 flex-shrink-0"></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-[#6A38C2]">CareerFlow</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed with ease and power in mind, we provide tools that work for both job seekers and recruiters
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'User-Friendly Interface',
                description: 'Intuitive design that makes job searching effortless and enjoyable.'
              },
              {
                title: 'Advanced Filters',
                description: 'Find exactly what you\'re looking for with our powerful search and filter options.'
              },
              {
                title: 'ATS Score Checker',
                description: 'Get instant feedback on your resume with our AI-powered ATS scoring system.'
              },
              {
                title: 'Real-Time Updates',
                description: 'Stay informed with instant notifications about new jobs and application status.'
              },
              {
                title: 'Secure Platform',
                description: 'Your data is protected with enterprise-grade security measures.'
              },
              {
                title: '24/7 Support',
                description: 'Our dedicated team is always here to help you succeed in your job search.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through CareerFlow. 
            Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <Button
                onClick={() => navigate('/signup')}
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-xl"
              >
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/jobs')}
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-xl"
              >
                Browse Jobs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
            <Button
              onClick={() => navigate('/atsScore')}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-700 text-lg px-8 py-6 rounded-full"
            >
              Check ATS Score
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Let's Build a Better Future Together
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We'd love to hear from you — reach out anytime. Your feedback helps us improve.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
              <div className="text-left">
                <div className="font-semibold">Email Us</div>
                <a href="mailto:careerflow@example.com" className="text-purple-600 hover:underline">
                  careerflow@example.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div className="text-left">
                <div className="font-semibold">Need Help?</div>
                <div className="text-gray-600">Visit our support center</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
