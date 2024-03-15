import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'
import Header from './components/Header'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import CreateApartmentListing from './pages/IT22577160_Pages/CreateApartmentListing'
import UpdateApartmentListing_02 from './pages/IT22577160_Pages/UpdateApartmentListing_02'

function App() {
  return (
    <>
      <Router>
        <Header />
          <div className='min-h-screen'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/sign-in' element={<SignIn/>}/>
              <Route path='/sign-up' element={<SignUp/>}/>
              <Route element={<PrivateRoute/>}>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/create-apartmentListing' element={<CreateApartmentListing/>}/>
                <Route path='/update-apartmentListing/:listingId' element={<UpdateApartmentListing_02/>}/>
              </Route>
              <Route path='/projects' element={<Projects/>}/>
            </Routes>
          </div>
        <Footer />
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
