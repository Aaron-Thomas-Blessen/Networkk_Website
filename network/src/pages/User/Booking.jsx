import { FaCalendarAlt, FaMapMarkerAlt, FaFileAlt } from 'react-icons/fa';
import { useState } from 'react';

const Booking = () => {
    //const { selectedGig } = useGig();
    //const { user } = useUser();
    //const location = useLocation();
    //const navigate = useNavigate();
    // const [date, setDate] = useState(location.state?.date || '');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // const formAnimation = useSpring({
    //     from: { opacity: 0, transform: 'translateY(-20px)' },
    //     to: { opacity: 1, transform: 'translateY(0px)' },
    //     config: config.gentle,
    //   });
    
    //   const confirmButtonAnimation = useSpring({
    //     from: { opacity: 0, transform: 'translateY(20px)' },
    //     to: { opacity: 1, transform: 'translateY(0px)' },
    //     config: config.wobbly,
    //   });
  return (
    <div className="Booking min-h-screen">
      
      <div className="mt-24 px-4 md:px-8 flex flex-col md:flex-row justify-center items-start gap-8">
        <div  className="w-full max-w-4xl p-4 md:p-8 border rounded-lg shadow-lg bg-white mb-4 md:mb-0">
          <div className="Appointment">
            <div>
              <h1 className="text-3xl font-bold mb-4 md:mb-8 text-center">Book Appointment</h1>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2" /> Date
              </label>
              <input 
                type="date" 
                id="date"
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                //readOnly // Make the input read-only
                className="block w-full p-3 border rounded-lg shadow-sm bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline mr-2" /> Address
              </label>
              <input 
                type="text" 
                id="address"
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Input the Exact Address" 
                className="block w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                <FaFileAlt className="inline mr-2" /> Description
              </label>
              <textarea 
                id="description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Work Description" 
                className="block w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                rows="4"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>
        </div>
        <div className="w-full max-w-xs p-4 md:p-8 bg-gray-200 rounded-lg shadow-lg">
          <div className="confirm text-center">
            <h1 className="text-2xl font-bold mb-4 md:mb-8">Amount Details</h1>
            <p className="text-3xl font-semibold text-gray-800 mb-4 md:mb-8">Base Price: <br />$100</p>
            <div >
              <button 
                //onClick={handleConfirm} 
                disabled={loading}
                className="w-full bg-black text-white px-4 py-2 md:px-8 md:py-4 rounded hover:bg-gray-800 cursor-pointer"
              >
                {loading ? <ClipLoader size={20} color={"#fff"} loading={loading} /> : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;