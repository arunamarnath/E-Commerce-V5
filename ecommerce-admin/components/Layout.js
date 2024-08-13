import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import Spline from '@splinetool/react-spline';

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [animateBounce, setAnimateBounce] = useState(true);
  const { data: session } = useSession();

  // Run bounce animation only on initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateBounce(false);
    }, 5000); // Duration of bounce animation

    return () => clearTimeout(timer);
  }, []);

  if (!session) {
    return (
      <div className="relative min-h-screen bg-bgGray">
        {/* Fullscreen Container for Spline */}
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/wnoZ2YpGuFHVSuKx/scene.splinecode" />
        </div>
        {/* Login Button with Bounce and Shake Animation */}
        <button 
          onClick={() => signIn('google')} 
          className={`absolute bottom-16 left-1/3 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg 
                     hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 
                     transition duration-300 ease-in-out 
                     ${animateBounce ? 'animate-bounce' : ''} hover:animate-shake`}
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="block md:hidden flex items-center p-4 bg-white shadow-md">
        <button 
          onClick={() => setShowNav(true)}
          className="text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex-grow flex justify-center">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
