import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import connectDB from "../utils/connection.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables (look for .env in backend root)
dotenv.config({ path: resolve(__dirname, "../.env") });

// Mock data for companies
const companiesData = [
  {
    name: "TechCorp Solutions",
    description: "A leading technology company specializing in software development and cloud solutions. We build innovative products that transform businesses.",
    website: "https://www.techcorp-solutions.com",
    location: "Bangalore, India",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop"
  },
  {
    name: "DataFlow Analytics",
    description: "Revolutionizing data analytics with cutting-edge AI and machine learning solutions. We help businesses make data-driven decisions.",
    website: "https://www.dataflow-analytics.com",
    location: "Hyderabad, India",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop"
  },
  {
    name: "GreenTech Innovations",
    description: "Sustainable technology solutions for a better future. We develop green technologies and eco-friendly software solutions.",
    website: "https://www.greentech-innovations.com",
    location: "Pune, India",
    logo: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop"
  },
  {
    name: "FinanceHub",
    description: "Leading fintech company providing innovative financial services and payment solutions to businesses worldwide.",
    website: "https://www.financehub.com",
    location: "Mumbai, India",
    logo: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=200&h=200&fit=crop"
  },
  {
    name: "HealthCare Digital",
    description: "Transforming healthcare through digital innovation. We build platforms that connect patients, doctors, and healthcare providers.",
    website: "https://www.healthcare-digital.com",
    location: "Delhi, India",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop"
  },
  {
    name: "EduTech Solutions",
    description: "Empowering education through technology. We create learning platforms and educational tools for students and institutions.",
    website: "https://www.edutech-solutions.com",
    location: "Noida, India",
    logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop"
  },
  {
    name: "CloudVault Systems",
    description: "Enterprise cloud infrastructure and security solutions. We help businesses migrate to the cloud securely and efficiently.",
    website: "https://www.cloudvault-systems.com",
    location: "Gurugram, India",
    logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=200&fit=crop"
  },
  {
    name: "RetailMax",
    description: "E-commerce and retail technology solutions. We help retailers build and manage their online presence and operations.",
    website: "https://www.retailmax.com",
    location: "Mumbai, India",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop"
  }
];

// Mock data for recruiter users
const recruitersData = [
  {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    password: "Recruiter123!",
    role: "Recruiter",
    phoneNumber: 1234567890
  },
  {
    fullName: "Michael Chen",
    email: "michael.chen@dataflow.com",
    password: "Recruiter123!",
    role: "Recruiter",
    phoneNumber: 1234567891
  },
  {
    fullName: "Emily Rodriguez",
    email: "emily.rodriguez@greentech.com",
    password: "Recruiter123!",
    role: "Recruiter",
    phoneNumber: 1234567892
  },
  {
    fullName: "David Thompson",
    email: "david.thompson@financehub.com",
    password: "Recruiter123!",
    role: "Recruiter",
    phoneNumber: 1234567893
  },
  {
    fullName: "Jessica Martinez",
    email: "jessica.martinez@healthcare.com",
    password: "Recruiter123!",
    role: "Recruiter",
    phoneNumber: 1234567894
  },
  {
    fullName: "Robert Kim",
    email: "robert.kim@edutech.com",
    password: "Recruiter123!",
    role: "Recruiter",
    phoneNumber: 1234567895
  },
  {
    fullName: "Amanda Wilson",
    email: "amanda.wilson@cloudvault.com",
    password: "Recruiter123!",
    role: "Recruiter",
    phoneNumber: 1234567896
  },
  {
    fullName: "James Anderson",
    email: "james.anderson@retailmax.com",
    password: "Recruiter123!",
    role: "Recruiter",
    phoneNumber: 1234567897
  }
];

// Mock data for jobs
const jobsData = [
  // TechCorp Solutions Jobs
  {
    title: "Senior Full Stack Developer",
    description: "We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies. The ideal candidate should have strong experience with React, Node.js, and cloud services.",
    requirements: ["5+ years of experience", "Proficiency in React and Node.js", "Experience with AWS or Azure", "Strong problem-solving skills", "Excellent communication abilities"],
    salary: 8,
    location: "Delhi",
    jobType: "Full-time",
    position: 2
  },
  {
    title: "Frontend Developer",
    description: "Join our frontend team to build beautiful and responsive user interfaces. You'll work with React, TypeScript, and modern CSS frameworks to create exceptional user experiences.",
    requirements: ["3+ years of frontend experience", "Expertise in React and TypeScript", "Knowledge of CSS frameworks", "UI/UX design understanding", "Git version control"],
    salary: 5,
    location: "Noida",
    jobType: "Full-time",
    position: 3
  },
  {
    title: "DevOps Engineer",
    description: "We need a DevOps Engineer to help us scale our infrastructure and improve our CI/CD pipelines. You'll work with Docker, Kubernetes, and cloud platforms.",
    requirements: ["4+ years of DevOps experience", "Kubernetes and Docker expertise", "CI/CD pipeline experience", "Cloud platform knowledge", "Infrastructure as Code"],
    salary: 9,
    location: "Gurugram",
    jobType: "Full-time",
    position: 1
  },
  // DataFlow Analytics Jobs
  {
    title: "Data Scientist",
    description: "We're seeking a talented Data Scientist to analyze complex datasets and build predictive models. You'll work with machine learning algorithms and big data technologies.",
    requirements: ["Master's degree in Data Science or related field", "Python and R proficiency", "Machine learning experience", "SQL and database knowledge", "Statistical analysis skills"],
    salary: 10,
    location: "Hyderabad",
    jobType: "Full-time",
    position: 2
  },
  {
    title: "Machine Learning Engineer",
    description: "Build and deploy machine learning models at scale. You'll work with TensorFlow, PyTorch, and cloud ML services to create innovative AI solutions.",
    requirements: ["5+ years of ML experience", "Deep learning frameworks", "Model deployment experience", "Python expertise", "Cloud ML services"],
    salary: 10,
    location: "Pune",
    jobType: "Full-time",
    position: 1
  },
  {
    title: "Data Analyst",
    description: "Analyze business data to provide insights and recommendations. You'll work with SQL, Excel, and visualization tools to help stakeholders make data-driven decisions.",
    requirements: ["2+ years of analytics experience", "SQL proficiency", "Excel and data visualization", "Business acumen", "Communication skills"],
    salary: 4,
    location: "Mumbai",
    jobType: "Full-time",
    position: 5
  },
  // GreenTech Innovations Jobs
  {
    title: "Sustainability Software Engineer",
    description: "Develop software solutions that help businesses reduce their carbon footprint. You'll work on green technology projects and sustainability platforms.",
    requirements: ["3+ years of software development", "Interest in sustainability", "Full stack development skills", "API development", "Environmental awareness"],
    salary: 6,
    location: "Delhi",
    jobType: "Full-time",
    position: 2
  },
  {
    title: "Environmental Data Analyst",
    description: "Analyze environmental data and create reports on sustainability metrics. You'll work with IoT sensors and environmental monitoring systems.",
    requirements: ["Bachelor's in Environmental Science or related", "Data analysis skills", "Python or R", "Environmental regulations knowledge", "Report writing"],
    salary: 3,
    location: "Noida",
    jobType: "Full-time",
    position: 3
  },
  // FinanceHub Jobs
  {
    title: "Senior Backend Developer",
    description: "Build secure and scalable financial services APIs. You'll work with microservices architecture and ensure compliance with financial regulations.",
    requirements: ["5+ years of backend development", "Java or Node.js expertise", "Microservices architecture", "Financial services experience", "Security best practices"],
    salary: 9,
    location: "Gurugram",
    jobType: "Full-time",
    position: 2
  },
  {
    title: "Fintech Product Manager",
    description: "Lead product development for financial technology products. You'll work with cross-functional teams to define product roadmaps and features.",
    requirements: ["5+ years of product management", "Fintech industry experience", "Agile methodology", "Stakeholder management", "Technical background"],
    salary: 8,
    location: "Hyderabad",
    jobType: "Full-time",
    position: 1
  },
  {
    title: "Payment Systems Engineer",
    description: "Develop and maintain payment processing systems. You'll work with payment gateways, APIs, and ensure secure transaction processing.",
    requirements: ["4+ years of payment systems experience", "Payment gateway integration", "Security protocols knowledge", "API development", "Financial regulations"],
    salary: 7,
    location: "Pune",
    jobType: "Full-time",
    position: 2
  },
  // HealthCare Digital Jobs
  {
    title: "Healthcare Software Developer",
    description: "Develop healthcare management systems and patient portals. You'll work with HIPAA compliance and healthcare data standards.",
    requirements: ["4+ years of software development", "Healthcare industry experience", "HIPAA compliance knowledge", "Full stack skills", "Electronic health records"],
    salary: 7,
    location: "Mumbai",
    jobType: "Full-time",
    position: 3
  },
  {
    title: "Medical Data Integration Specialist",
    description: "Integrate medical devices and systems with our platform. You'll work with HL7, FHIR, and other healthcare data standards.",
    requirements: ["3+ years of healthcare IT", "HL7 and FHIR knowledge", "API integration", "Medical device experience", "Data mapping skills"],
    salary: 6,
    location: "Delhi",
    jobType: "Full-time",
    position: 2
  },
  // EduTech Solutions Jobs
  {
    title: "EdTech Full Stack Developer",
    description: "Build educational platforms and learning management systems. You'll create engaging user experiences for students and educators.",
    requirements: ["3+ years of full stack development", "React and Node.js", "Learning platform experience", "User experience focus", "Educational technology interest"],
    salary: 5,
    location: "Noida",
    jobType: "Full-time",
    position: 4
  },
  {
    title: "Learning Experience Designer",
    description: "Design engaging learning experiences and course content. You'll work with instructional designers and developers to create educational content.",
    requirements: ["2+ years of instructional design", "Educational technology tools", "Content creation", "User experience design", "Pedagogy knowledge"],
    salary: 3,
    location: "Gurugram",
    jobType: "Full-time",
    position: 3
  },
  // CloudVault Systems Jobs
  {
    title: "Cloud Security Engineer",
    description: "Ensure the security of our cloud infrastructure and applications. You'll work with security tools, compliance, and threat detection.",
    requirements: ["5+ years of cloud security", "AWS or Azure security", "Security certifications", "Threat detection", "Compliance knowledge"],
    salary: 10,
    location: "Hyderabad",
    jobType: "Full-time",
    position: 1
  },
  {
    title: "Cloud Solutions Architect",
    description: "Design and implement cloud architecture solutions for enterprise clients. You'll work with AWS, Azure, and GCP to build scalable systems.",
    requirements: ["7+ years of cloud architecture", "Multi-cloud experience", "Solution design", "Client consultation", "Architecture certifications"],
    salary: 10,
    location: "Pune",
    jobType: "Full-time",
    position: 1
  },
  {
    title: "Infrastructure Engineer",
    description: "Manage and maintain cloud infrastructure. You'll work with Terraform, Ansible, and cloud platforms to ensure reliable systems.",
    requirements: ["4+ years of infrastructure experience", "Infrastructure as Code", "Cloud platforms", "Monitoring and logging", "Automation skills"],
    salary: 8,
    location: "Mumbai",
    jobType: "Full-time",
    position: 2
  },
  // RetailMax Jobs
  {
    title: "E-commerce Developer",
    description: "Build and maintain e-commerce platforms and shopping experiences. You'll work with payment systems, inventory management, and user interfaces.",
    requirements: ["3+ years of e-commerce development", "E-commerce platforms", "Payment integration", "Inventory systems", "Shopping cart functionality"],
    salary: 6,
    location: "Delhi",
    jobType: "Full-time",
    position: 3
  },
  {
    title: "Retail Analytics Specialist",
    description: "Analyze retail data to provide insights on sales, inventory, and customer behavior. You'll work with analytics tools and create reports.",
    requirements: ["2+ years of retail analytics", "Data analysis skills", "Retail industry knowledge", "SQL and Excel", "Business intelligence tools"],
    salary: 4,
    location: "Noida",
    jobType: "Full-time",
    position: 4
  },
  {
    title: "Mobile App Developer",
    description: "Develop mobile applications for iOS and Android platforms. You'll work with React Native or native development to create retail apps.",
    requirements: ["3+ years of mobile development", "React Native or native", "App Store deployment", "UI/UX design", "API integration"],
    salary: 7,
    location: "Gurugram",
    jobType: "Full-time",
    position: 2
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log("Connected to database");

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("Clearing existing data...");
    await Job.deleteMany({});
    await Company.deleteMany({});
    await User.deleteMany({ role: "Recruiter" });
    console.log("Existing data cleared");

    // Create recruiter users
    console.log("Creating recruiter users...");
    const createdRecruiters = [];
    for (let i = 0; i < recruitersData.length; i++) {
      const recruiter = new User(recruitersData[i]);
      await recruiter.save();
      createdRecruiters.push(recruiter);
      console.log(`Created recruiter: ${recruiter.fullName}`);
    }

    // Create companies
    console.log("\nCreating companies...");
    const createdCompanies = [];
    for (let i = 0; i < companiesData.length; i++) {
      const companyData = {
        ...companiesData[i],
        userId: createdRecruiters[i]._id
      };
      const company = new Company(companyData);
      await company.save();
      createdCompanies.push(company);
      console.log(`Created company: ${company.name}`);
    }

    // Create jobs
    console.log("\nCreating jobs...");
    let jobIndex = 0;
    for (let companyIndex = 0; jobIndex < jobsData.length; companyIndex++) {
      const company = createdCompanies[companyIndex];
      const recruiter = createdRecruiters[companyIndex];
      
      // Assign 3 jobs per company (or remaining jobs)
      const jobsPerCompany = Math.min(3, jobsData.length - jobIndex);
      
      for (let i = 0; i < jobsPerCompany && jobIndex < jobsData.length; i++) {
        const jobData = {
          ...jobsData[jobIndex],
          company: company._id,
          createdBy: recruiter._id,
          application: []
        };
        const job = new Job(jobData);
        await job.save();
        console.log(`Created job: ${job.title} at ${company.name}`);
        jobIndex++;
      }
    }

    console.log("\n✅ Seed data created successfully!");
    console.log(`\nSummary:`);
    console.log(`- Recruiters: ${createdRecruiters.length}`);
    console.log(`- Companies: ${createdCompanies.length}`);
    console.log(`- Jobs: ${jobIndex}`);
    
    // Close database connection
    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();

