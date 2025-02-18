import freelancerImg from '../images/Freelance-worker.jpg';
import brickwork from '../images/brickwork.png';
import carpenter from '../images/carpenter.jpg';
import carpentericon from '../images/carpentericon.png';
import freelance from '../images/Freelance-worker.jpg';
import homerepair from '../images/home repair icon.png';
import painter from '../images/Painter.jpg';
import voltmeter from '../images/voltmeter.png';
import plumbericon from '../images/plumbericon.png';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiAntdesign, SiLinkedin } from "react-icons/si";
import { BsFacebook, BsGithub, BsGlobe, BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";
import { toast } from 'react-toastify';
import Navbar from '../components/nav';

const Home = () => {
  const TwoColumnSection = () => {
    return (
      <div className="flex flex-wrap justify-between items-center mb-20 mt-20 p-5 lg:pl-20">
        <div className="w-full md:w-1/2 lg:w-auto lg:flex-1 lg:pr-10">
          <h4 className="text-2xl font-bold mb-4">Discover</h4>
          <h1 className="text-4xl font-bold mb-6">
            Find Skilled Workers and <br />
            Offer Your Services
          </h1>
          <div className="btn flex">
            <button className="px-8 py-4 bg-black text-white rounded-lg mr-4">
              <a href="/user-auth">Get Started</a>
            </button>
            <button className="px-8 py-4 bg-white border-2 border-blue-gray-700 text-black rounded-lg hover:bg-gray-200 ml-4">
              Learn more
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-auto lg:flex-1 lg:pl-10 mt-8 lg:mt-0">
          <ul>
            <li className="mb-4">
              <div className="flex">
                <SiAntdesign className="mt-1 mr-6" />
                <h2 className="text-lg font-bold mb-2">Step 1</h2>
              </div>
              <p className="ml-10">Search for skilled workers in your area using our map-based technology.</p>
            </li>
            <li className="mb-4">
              <div className="flex">
                <SiAntdesign className="mt-1 mr-6" />
                <h2 className="text-lg font-bold mb-2">Step 2</h2>
              </div>
              <p className="ml-10">Signup and choose the skilled person you want to hire.</p>
            </li>
            <li className="mb-4">
              <div className="flex">
                <SiAntdesign className="mt-1 mr-6" />
                <h2 className="text-lg font-bold mb-2">Step 3</h2>
              </div>
              <p className="ml-10">Connect with skilled workers and discuss your work.</p>
            </li>
            <li className="mb-4">
              <div className="flex">
                <SiAntdesign className="mt-1 mr-6" />
                <h2 className="text-lg font-bold mb-2">Step 4</h2>
              </div>
              <p className="ml-10">Get the job done and leave a review for the skilled worker.</p>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const FAQToggle = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setTimeout(() => {
        setIsOpen(!isOpen);
      }, 200);
    };

    return (
      <div>
        <div className="faq-item">
          <button
            className="faq-question flex justify-between items-center w-full px-4 py-2 rounded-md cursor-pointer"
            onClick={toggleAccordion}
          >
            <span className="font-semibold">{question}</span>
            <span className={`arrow ${isOpen ? 'transform rotate-180' : ''}`}>
              <SlArrowDown className="justify-items-end" />
            </span>
          </button>
          {isOpen && (
            <div className="faq-answer p-4 mt-2">
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Two = () => {
    return (
      <div className="home">
        <div className="flex flex-col lg:flex-row items-center justify-center mb-16">
          <div className="lg:w-1/2 lg:pl-4 p-10 ml-6">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-4 text-center">
                Find Skilled Workers Nearby for Your Freelance Projects
              </h1>
            </div>

            <div className="text-center lg:py-8 mb-4">
              <p>
                Networkk connects you with skilled workers in your area,
                providing convenient access to local job opportunities and
                trusted verified services.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-0">
              <div className="lg:w-1/2 lg:pr-4 mb-8 lg:mb-0">
                <h4 className="text-xl font-bold mb-4">Convenience</h4>
                <p>
                  Easily find and hire skilled workers for your projects, saving
                  you time and effort.
                </p>
              </div>
              <div className="lg:w-1/2 lg:pl-4">
                <h4 className="text-xl font-bold mb-4">
                  Local Job Opportunities
                </h4>
                <p>
                  Discover job opportunities in your area and connect with
                  employers seeking your skill.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pr-4">
            <img
              className="freelancer-img lg:float-right"
              src={freelancerImg}
              alt="Freelance-Workers-img"
            />
          </div>
        </div>

        <section id="services-home-container" className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-8">
                Discover a Diverse Range of Services on Networkk
              </h1>
              <p className="text-base text-gray-700 mb-8">
                Networkk is your go-to platform for finding skilled workers in
                your area. Whether you need a carpenter, plumber, electrician,
                or any other service provider, we've got you covered. Our
                diverse range of services ensures that you can easily find the
                right professional for your needs. With Networkk, you can trust
                that you're hiring experienced professionals who will deliver
                high-quality work. Don't settle for anything less than the best
                - explore our services today and get your project started with
                ease.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-1">
                <div className="text-center">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={carpentericon}
                    alt="carpentryicon"
                  />
                  <h4 className="text-lg font-semibold mb-2">Carpentry Work</h4>
                  <p>
                    Carpenters are skilled craftsmen who specialize in the
                    construction of wooden furniture and other wooden
                    structures.
                  </p>
                </div>
                <div className="text-center mt-8">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={homerepair}
                    alt="carpentryicon"
                  />
                  <h4 className="text-lg font-semibold mb-2">
                    Home Repairs and Renovation
                  </h4>
                  <p>
                    Hire experienced professionals for all your home repair,
                    maintenance, and renovation needs.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="text-center">
                  <img
                    className="mx-auto mb-4"
                    src={carpenter}
                    alt="carpentryicon"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="text-center">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={voltmeter}
                    alt="carpentryicon"
                  />
                  <h4 className="text-lg font-semibold mb-2">
                    Electrical Work
                  </h4>
                  <p>
                    Find skilled workers in your area for all your home's
                    electrical and wiring needs and say goodbye to all your
                    troubles.
                  </p>
                </div>
                <div className="text-center mt-8">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={brickwork}
                    alt="carpentryicon"
                  />
                  <h4 className="text-lg font-semibold mb-2">Masonry Work</h4>
                  <p>
                    Masonry workers are the skilled people you may hire to do
                    all your construction and building works.
                  </p>
                </div>
              </div>
            </div>
            <div className="button-container1 flex justify-center py-8">
              <div className="mx-4">
                <button className="signup px-6 py-3 bg-white border-2 border-blue-gray-700 text-black rounded-lg hover:bg-gray-200">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:mr-8 mb-8 lg:mb-0">
          <div className="mid-page-signup lg:ml-10 py-6 lg:w-1/2 lg:pr-8">
            <div className="text-container1 text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-4">
                Find Skilled Workers Near You
              </h1>
              <div className="py-4">
                <p>
                  Connect with talented freelancers for all your service needs.
                </p>
              </div>
              <div className="button-container2 flex justify-center lg:justify-start">
                <div className="mx-4">
                  <button className="login1 px-6 py-3 bg-white border-2 border-blue-gray-700 text-black rounded-lg hover:bg-gray-200">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img
            className="freelancer-img mb-4 lg:mb-0"
            alt="Freelance-Workers-img"
            src={painter}
          />
        </div>
        <div className="mb-8 mt-10 flex justify-center py-8">
          <div className="p-5">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">What Networkk Offers</h1>
              <h4 className="text-base">
                Empowering skilled workers and users with rewarding opportunities and services.
              </h4>
            </div>
            <div className="mt-6">
              <div className="flex items-start mb-4">
                <div className="rounded-full h-4 w-4 bg-black mr-2 mt-1"></div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    Connects you to the right person
                  </h4>
                  <h6 className="text-sm">
                    Networkk connects the users with the absolute skilled person to get their job done.
                  </h6>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <div className="rounded-full h-4 w-4 bg-black mr-2 mt-1"></div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Map-based interface
                  </h4>
                  <h6 className="text-sm">
                    Networkk provides a location-based filtering feature which allows you to find the right skilled person within your locality.
                  </h6>
                </div>
              </div>
              <div className="flex items-start">
                <div className="rounded-full h-4 w-4 bg-black mr-2 mt-1"></div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Safe and Secure Services
                  </h4>
                  <h6 className="text-sm">
                    Networkk ensures the safety of the users by thorough checking of the sellers' background.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 flex flex-col justify-center p-10">
          <div className="w-full flex flex-col justify-center my-10">
            <h1 className="text-3xl font-bold mb-3">Frequently Asked Questions</h1>
            <h6 className="text-sm">
              Find answers to commonly asked questions about our platform and
              services.
            </h6>
            
          </div>

          <div className="w-full p-5">
            <hr className="my-4 border-t-2 border-gray-300" />
            <FAQToggle question={"How does it work ?"} answer={" Signup with networkk. and use the search functionality to find the ideal skilled service provider near you for your needs within 10km radius of your location."}/>
            <hr className="my-4 border-t-2 border-gray-300" />
            
            <FAQToggle question={"Is it safe ?"} answer={"Networkk prioritizes customer safety and security by thoroughly screening each service provider for any criminal record. This screening process includes checking the Government-issued Police Clearance Certificate (PCC), which is updated every 6 months to ensure the genuineness and safety of the services offered on the platform."}/>
            <hr className="my-4 border-t-2 border-gray-300" />

            <FAQToggle question={"How do I sign up?"} answer={"Signing up is easy. Simply create an account either as a  user or as a service provider by entering your email address and creating a password. Once you've signed up, you can begin browsing for skilled services or complete the verification process to register as a verified service provider."} />
            <hr className="my-4 border-t-2 border-gray-300" />

            <FAQToggle question={"Can I offer my service?"} answer={"Certainly! You can offer your services on Networkk. Just sign up as a service provider, undergo verification by submitting your Government-issued Police Clearance Certificate, and then you're free to offer any skilled service you desire."} />
            <hr className="my-4 border-t-2 border-gray-300" />

            <FAQToggle question={"How can I get paid?"} answer={"You can work on a minimum charge set by yourself and get paid in real time"} />
            <hr className="my-4 border-t-2 border-gray-300" />
          </div>
        </div>
        <div className="Team py-12">
          <div className="text-center mb-16">
            <h6 className="text-lg">Connecting</h6>
            <h1 className="text-4xl font-bold">Our Team</h1>
            <h6 className="text-lg">
              Meet the talented individuals behind Networkk
            </h6>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Aaron Thomas Blessen</h2>
              <h3 className="text-lg">CMO</h3>
              <h4 className="text-base">
                Experienced strategist with a passion for innovation and growth.
              </h4>
              <div className="flex justify-center mt-4 space-x-8">
                <a href="https://www.linkedin.com/in/aaron-thomas-blessen-390200214/" target="_blank" rel="noopener noreferrer">
                  <SiLinkedin className="text-black-500 text-2xl" />
                </a>
                <a href="https://twitter.com/aaron_blessen" target="_blank" rel="noopener noreferrer">
                  <BsTwitterX className="text-black-500 text-2xl" />
                </a>
                <a href="https://github.com/Aaron-Thomas-Blessen" target="_blank" rel="noopener noreferrer">
                  <BsGithub className="text-black-500 text-2xl" />
                </a>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Akshay Gopan</h2>
              <h3 className="text-lg">CTO</h3>
              <h4 className="text-base">
                Tech enthusiast with expertise in developing cutting-edge
                solutions.
              </h4>
              <div className="flex justify-center mt-4 space-x-8">
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                  <SiLinkedin className="text-black-500 text-2xl" />
                </a>
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                  <BsTwitterX className="text-black-500 text-2xl" />
                </a>
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                  <BsGithub className="text-black-500 text-2xl" />
                </a>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Alan Philip</h2>
              <h3 className="text-lg">COO</h3>
              <h4 className="text-base">
                Operations expert focused on delivering exceptional user
                experiences.
              </h4>
              <div className="flex justify-center mt-4 space-x-8">
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                  <SiLinkedin className="text-black-500 text-2xl" />
                </a>
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                  <BsTwitterX className="text-black-500 text-2xl" />
                </a>
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                  <BsGithub className="text-black-500 text-2xl" />
                </a>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Chandrasekhar C.A</h2>
              <h3 className="text-lg">Marketing Director</h3>
              <h4 className="text-base">
                Strategic marketer driving brand awareness and customer
                acquisition.
              </h4>
              <div className="flex justify-center mt-4 space-x-8">
                <a href="https://www.linkedin.com/in/chandrasekharca" target="_blank" rel="noopener noreferrer">
                  <SiLinkedin className="text-black-500 text-2xl" />
                </a>
                <a href="https://x.com/ChanduTumba?t=lsvX1R7kTQk41BZk4VKWgQ&s=08" target="_blank" rel="noopener noreferrer">
                  <BsTwitterX className="text-black-500 text-2xl" />
                </a>
                <a href="https://github.com/ChanduTumba" target="_blank" rel="noopener noreferrer">
                  <BsGithub className="text-black-500 text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="contact py-12">
          <div className="flex flex-col">
            <div className="py-8 text-center">
              <h1 className="text-3xl font-bold">Contact Us</h1>
              <h6 className="text-sm mt-2">
                Get in touch with us to explore opportunities, ask questions, or share feedback. We're here to help!
              </h6>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 text-center mt-4">
                <h3 className="font-bold text-lg">Email</h3>
                <h6 className="text-md">contact@networkk.com</h6>
              </div>
              <div className="w-full md:w-1/3 text-center mt-4">
                <h3 className="font-bold text-lg">Phone</h3>
                <h6 className="text-md">+1 (555) 090-1356</h6>
              </div>
              <div className="w-full md:w-1/3 text-center mt-4">
                <h3 className="font-bold text-lg">Office</h3>
                <h6 className="text-md">Kottayam, Kerala, India</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="news flex flex-wrap justify-center py-8">
          <div className="w-full lg:w-3/5 lg:pr-8">
            <img src="https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Flogo-text1__1_-removebg-preview.png?alt=media&token=ff8304f7-1b98-4d3d-92dc-af6d60f928dc" className="w-44" />
            <h5 className="text-base">
              Stay up to date on features and releases by joining our
              newsletter.
            </h5>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-black"
              />
              <button className="px-4 py-2 bg-black text-white rounded-r-lg">
                Subscribe
              </button>
            </div>
            <h6 className="text-sm mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </h6>
          </div>
          <div className="w-full lg:w-2/5 text-center">
            <h3 className="text-lg font-semibold">Follow us on:</h3>
            <div className="flex justify-center mt-4 space-x-8">
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                <SiLinkedin className="text-black-500 text-2xl" />
              </a>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                <BsTwitterX className="text-black-500 text-2xl" />
              </a>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                <BsFacebook className="text-black-500 text-2xl" />
              </a>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                <BsYoutube className="text-black-500 text-2xl" />
              </a>
            </div>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 my-2" />

        <div className="footer flex flex-wrap justify-between items-center mb-2">
          <div className="w-full lg:w-auto">
            <h6>© 2024 Networkk All rights reserved.</h6>
          </div>
          <div className="flex flex-wrap">
            <h6 className="mr-4">Privacy Policy</h6>
            <h6 className="mr-4">Terms of Service</h6>
            <h6>Cookies Settings</h6>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home bg-offwhite">
      <Navbar />
      <TwoColumnSection />
      <Two />
    </div>
  );
};

export default Home;