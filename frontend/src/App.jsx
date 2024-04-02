import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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
import DashMaintenance from './components/IT22607232_Components/DashMaintenance'
import TaskAssign from './pages/IT22607232_Pages/s1_TaskAssignCreation'
import RequestLeave_04 from './pages/IT22603418_Pages/RequestLeave_04'
import OnlyPropertyAdminPrivateRoute_02 from './components/IT22577160_Components/OnlyPropertyAdminPrivateRoute_02'
import CreateSharedResources_02 from './pages/IT22577160_Pages/CreateSharedResources_02'
import TasksTable_01 from './components/IT22607232_Components/TasksTable_01'



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
                <Route path="/" element={<DashMaintenance/>} />
                <Route path="/task-assign" element={<TaskAssign/>} />
                <Route path="/tasks-table:taskid" element={<TasksTable_01/>} />
                <Route path="/update-tasks:taskid" element={<s1_UpdateTasks/>} />

            
              </Route>
              <Route element={<OnlyPropertyAdminPrivateRoute_02/>}>
                <Route path="/create-sharedResourceListing" element={<CreateSharedResources_02/>} />
              </Route>
              <Route path='/projects' element={<Projects/>}/>
              <Route path='/create_04' element={<RequestLeave_04/>}/>
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
