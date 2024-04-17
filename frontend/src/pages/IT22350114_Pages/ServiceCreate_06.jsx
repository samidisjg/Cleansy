import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ServiceListingCreate = () => {
   const {currentUser} = useSelector(state => state.user);
   const [files, setFiles] = useState([])
   const [formData, setFormData] = useState({
        serviceID: '',
        serviceName: '',
        serviceDescription: '',
        servicePrice: '',
        serviceType: '',
        serviceImageUrls: [],
        serviceAvailability: true,
        serviceContactInfo: {
            phone: '',
            email: '',
            address: ''
        },
        serviceRequirements: []
    });
    
    const {serviceID, serviceName, serviceDescription, servicePrice, serviceType, serviceImageUrls, serviceAvailability, serviceContactInfo, serviceRequirements} = formData;
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [imageUploadError, setImageUploadError] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => { 
        e.preventDefault();
        
        try {
            if(serviceID === '' || serviceName === '' || serviceDescription === '' || servicePrice === '' || serviceType === '' || serviceImageUrls.length === 0 || serviceContactInfo.phone === '' || serviceContactInfo.email === '' || serviceContactInfo.address === '' || serviceRequirements.length === 0){
                return setError('Please fill in all fields');
            }
            if(servicePrice < 0){
                return setError('Price cannot be negative');
            }
            if(formData.serviceID === currentUser.serviceID) return setError('Service ID already exists');
            if(serviceImageUrls.length < 1) return setError('Please upload at least one image');
            setLoading(true);
            setError(false);

            const res = await fetch('/api/serviceListing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...(formData),
                    userRef: currentUser._id

                })
            });

            // const response = await axios.post('http://localhost:5000/api/services', formData, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${currentUser.token}`
            //     }
            // });
            // if(response.status === 201){
            //     navigate('/services');
            // }
        } catch (error) {
            console.log(error);
            setError('Failed to create service');
            setLoading(false);
        }
    }



    return (
        <div>
            <h1>Hi</h1>
        </div>
    );
}

export default ServiceListingCreate;