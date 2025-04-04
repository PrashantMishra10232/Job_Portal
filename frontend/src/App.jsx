import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import JobSetup from './components/admin/JobSetup'
import JobApplicantsTable from './components/admin/JobApplicantsTable'
import ProtectedRoute from './components/admin/ProtectedRoute'

// import axios from 'axios';
// import { USER_API_ENDPOINT } from './utils/constant';



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/Jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },


  //admin
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><JobSetup/></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><JobApplicantsTable/></ProtectedRoute>
  },

])



function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
