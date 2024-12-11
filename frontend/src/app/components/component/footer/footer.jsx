import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineLinkedin, AiOutlineMail } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-rgb(4, 1, 29) text-white py-2 mt-6  ">
      {/* Gradient Line Breaker */}
      
      <hr className="w-full h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 border-0 rounded-full opacity-100 transform scale-x-100 origin-left" />
        {/* Social Media Icons */}
        <div className="flex justify-center  items-center gap-6 mb-8 lg:mb-0 mt-6">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
            <AiOutlineInstagram size={30} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
            <AiOutlineFacebook size={30} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
            <AiOutlineLinkedin size={30} />
          </a>
          <a href="mailto:example@email.com" className="text-white hover:text-blue-500">
            <AiOutlineMail size={30} />
          </a>
        </div>
      

      {/* Copyright Section */}
      <div className="text-center text-sm m-2">
        <p className="text-white">
          &copy; 2024 <span className="text-gradient font-bold">Team IEEE Photonics & ComSoc</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}


{/* <div className="relative mb-2">
  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-blue-500 to-orange-500 h-1"></div>
</div>
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-center">
        
        <div className="mb-8 lg:mb-0 text-center lg:text-left">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
            Subscribe for Notifications
          </h2>
          <p className="text-lg mt-4">Enter your email ID and stay informed!</p>
          <div className="mt-4 flex justify-center lg:justify-start items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md border border-gray-300 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            />
            <button className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-500 to-orange-500 text-white font-semibold hover:bg-gradient-to-l">
              Subscribe
            </button>
          </div>
        </div> */}