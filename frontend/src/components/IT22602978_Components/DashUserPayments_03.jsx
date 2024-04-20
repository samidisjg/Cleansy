import { useSelector } from "react-redux";
import AllPaymentProfiles from './../../pages/IT22602978_Pages/AllPaymentProfile_03';
import { Route, Routes } from 'react-router-dom';
import Update from "./Update";


const DashPayments_03 = () => {
  const { currentUser } = useSelector((state) => state.user);
  
  return (
       
          <div className=' overflow-auto ' >
            <AllPaymentProfiles />
            
          </div>
          
        
  );
}

export default DashPayments_03;
