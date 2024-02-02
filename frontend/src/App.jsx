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
              <Route path='/dashboard' element={<Dashboard/>}/>
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
