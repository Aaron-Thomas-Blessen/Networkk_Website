import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';

const GigsView = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axiosInstance.get('/services/');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div>
            <h1>Services</h1>
            <div className="services-list">
                {services.length > 0 ? (
                    services.map((service) => (
                        <div key={service.id} className="service-item">
                            <h2>{service.name}</h2>
                            <p>{service.description}</p>
                            <p>Price: Rs{service.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No services available</p>
                )}
            </div>
        </div>
    );
};

export default GigsView;