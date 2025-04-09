import React from 'react';
import Navbar from './shared/Navbar';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-b from-purple-100 to-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-6">About Chakri<span className='text-red-500'>Portal</span></h1>
          <p className="text-lg text-purple-800 mb-10">
            We connect talent with opportunity. Whether you're a job seeker or an employer, ChakriPortal makes hiring and applying simpler, smarter, and more human.
          </p>

          <img
            src="https://www.3dfototapete.de/media/catalog/product/b/o/boff0018-ofis-duvar-kagidi-dekorasyon-teamwork.jpg"
            alt="Teamwork"
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg mb-12"
          />

          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">🚀 Who We Are</h2>
              <p className="text-purple-700">
                ChakriPortal is a next-gen job search platform designed to help professionals and companies grow. We are passionate about creating career-changing opportunities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">💼 What We Do</h2>
              <ul className="list-disc ml-5 space-y-2 text-purple-700">
                <li>🔍 Easy job search & filters</li>
                <li>📝 One-click applications</li>
                <li>🏢 Trusted employer listings</li>
                <li>📊 Job & application dashboards</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">🤝 Our Mission</h2>
              <p className="text-purple-700">
                To bridge the gap between ambition and achievement by simplifying the hiring process for everyone.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">🌐 Why ChakriPortal?</h2>
              <p className="text-purple-700">
                Designed with ease and power in mind, we provide tools that work for both job seekers and recruiters. Efficiency meets elegance here.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-2">Let’s build a better future together</h2>
            <p className="text-purple-800">We'd love to hear from you — reach out anytime.</p>
            <p className="mt-2 text-purple-600">
              📧 <a href="mailto:chakriportal@example.com" className="underline">chakriportal@example.com</a>
            </p>
          </div>
        </div>
      </section>
    </>

  );
};

export default AboutUs;
