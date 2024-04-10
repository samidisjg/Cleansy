

const CreateServiceListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    serviceID: "",
    serviceName: "",
    serviceDescription: "",
    servicePrice: "",
    serviceType: "",
    serviceImageUrls: [],
    serviceAvailability: true,
    serviceContactInfo: {
      phone: "",
      email: "",
      address: "",
    },
    serviceRequirements: [],
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: boolean !== null ? boolean : e.target.value,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.serviceName === currentUser.serviceName) return setError('Service Name already exists');
      setLoading(true);
      setError(false);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/serviceListing`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.errorMessage);
      setLoading(false);
    }
  }

  const handleImageChange = (e) => {
    setFormData({
        ...formData,
        Image: e.target.files[0],
    });
}

return (
  <div className="min-h-screen mt-20">
    <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300"> Create Amenity</h1>
  </div>
);
}

export default CreateServiceListing;