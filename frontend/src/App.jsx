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
import AboutUs from './components/AboutUs'
import SavedJobs from './components/SavedJobs'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from './utils/constant'
import {setToken } from './redux/authSlice'
import { useEffect } from 'react'
import AtsScore from './components/AI/AtsScore'
import LoginSuccess from './components/auth/LoginSuccess'
import HrDashBoard from './components/admin/HrDashBoard'
import InterviewScheduled from './components/admin/InterviewScheduled'
import CompaniesDashboard from './components/admin/CompaniesDashboard'
import TablesDashboard from './components/admin/TablesDashboard'
import CalendarPage from './components/admin/CalendarPage'
import InterviewSetup from './components/admin/InterviewSetup'


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
    path: '/login/success',
    element: <LoginSuccess/>
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
    path: '/atsScore',
    element: <AtsScore />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/about',
    element: <AboutUs />
  },
  {
    path: '/savedJobs',
    element: <SavedJobs />
  },


  //admin
  {
    path:'/admin/dashboard',
    element:<ProtectedRoute><HrDashBoard/></ProtectedRoute>
  },
  {
    path:'/admin/interviewSetup',
    element:<ProtectedRoute><InterviewSetup/></ProtectedRoute>
  },
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/dashboard',
    element: <ProtectedRoute><CompaniesDashboard /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/dashboard',
    element: <ProtectedRoute><TablesDashboard /></ProtectedRoute>
  },
  {
    path: '/admin/calendar/dashboard',
    element: <ProtectedRoute><CalendarPage /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><JobSetup /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><JobApplicantsTable /></ProtectedRoute>
  },
  {
    path: '/admin/meetings',
    element: <ProtectedRoute><InterviewScheduled/></ProtectedRoute>
  }
])



function App() {

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!token) {
      const refreshToken = async () => {
        try {
          const res = await axios.post(`${USER_API_ENDPOINT}/refresh_token`, {}, {
            withCredentials: true,
          });
          const { accessToken } = res.data.data;
          dispatch(setToken(accessToken));
        } catch (err) {
          if (err.response?.status === 401) {
            console.warn("No refresh token found, Skipping logout")
          } else {
            console.error("Failed to refresh token on app load:", err);
          }
        }
      };
      refreshToken();
    }
  }, [token]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
