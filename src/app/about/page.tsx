import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12">
      {/* Container */}
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="text-gray-600 mt-4 text-lg">Learn more about our mission, vision, and how we make a difference in the healthcare industry.</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Section - Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At Medibazar, we are dedicated to making healthcare products more accessible to everyone. Our mission is to ensure that people from all walks of life have access to quality healthcare items at affordable prices.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              We strive to provide healthcare solutions that are both affordable and effective. With a customer-first mindset, we aim to bridge the gap between healthcare providers and people in need of essential medical supplies.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our vision is to revolutionize the healthcare product distribution system, ensuring people everywhere can get the products they need, when they need them, without hassle.
            </p>
          </div>

          {/* Right Section - Image */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="https://kinsta.com/wp-content/uploads/2021/11/about-us-page-1024x512.png"
              alt="About Us"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>

        {/* Join Us Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Join Us</h2>
          <p className="text-gray-700 text-lg mb-6">
            Become a part of our growing community. Whether you're a customer, healthcare provider, or part of our team, we’re always looking for passionate individuals to help us achieve our goals.
          </p>
          <p className="text-gray-700 text-lg">
            We believe in continuous growth and are constantly looking for new ways to improve our services. Join us on our mission to make healthcare more accessible for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
