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
    element: <Companies />
  },
  {
    path: '/admin/companies/create',
    element: <CompanyCreate />
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup/>
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs/>
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
