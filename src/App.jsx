import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Welcome from './components/Pages/Welcome/Welcome';
import Videos from './components/Pages/Videos/Videos';
import Books from './components/Pages/Book/Books';
import Courses from './components/Pages/Courses/Courses';
import Roadmap from './components/Pages/Roadmap/Roadmap';
import MutualFunds from './components/Pages/Mutual Funds/MutualFunds';
import IPO from './components/Pages/IPO/IPO';
import Trading from './components/Pages/Trading/Trading';
import PaperTrading from './components/Pages/PaperTrading/PaperTrading';
import LoginForm from './components/User/Login/LoginForm';
import SignupForm from './components/User/Signup/SignupForm'
import LogoutForm from './components/User/Logout/LogoutForm';
import Review from './components/User/Reviews/Review';
const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Welcome />
      }, {
        path: '/videos',
        element: <Videos />
      }, {
        path: '/books',
        element: <Books />
      }, {
        path: '/courses',
        element: <Courses />
      }, {
        path: '/roadmap',
        element: <Roadmap />
      }, {
        path: '/mutual-funds',
        element: <MutualFunds />
      }, {
        path: '/ipo',
        element: <IPO />
      }, {
        path: '/trading',
        element: <Trading />
      }, {
        path: '/paper-trading',
        element: <PaperTrading />
      }, {
        path: '/login',
        element: <LoginForm />
      }, {
        path: '/signup',
        element: <SignupForm />
      },{
        path: '/logout',
        element: <LogoutForm />
      },{
        path: '/reviews',
        element: <Review/>
      }
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}