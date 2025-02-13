import { useEffect, useState } from 'react';

const Pay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRazorpay = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onerror = () => {
          setError('Failed to load Razorpay. Please try again.');
        };
        document.body.appendChild(script);
      } catch (err) {
        setError('Failed to initialize payment.');
        console.error('Razorpay initialization error:', err);
      }
    };
    loadRazorpay();

    // Cleanup
    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: 100, // 1 INR
        currency: "INR",
        name: "Networkk",
        description: "Payment for Services",
        handler: function(response) {
          console.log("Payment ID: " + response.razorpay_payment_id);
          // Add success handling here
        },
        prefill: {
          name: "Percy",
          email: "percythomas00@gmail.com",
          contact: "8989898989",
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setError('Payment initialization failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <button 
        className={`px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md 
        hover:bg-blue-700 transition-colors duration-200 ease-in-out 
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-opacity-50 text-lg font-semibold
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handlePayment}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Pay ₹1'}
      </button>
    </div>
  );
};

export default Pay;