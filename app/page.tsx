import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Lightdark from "@/components/LandingPage/light-dark";
import Navbar from "@/components/LandingPage/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className='min-h-screen relative'>
      <Navbar />
      <Hero />
      <Footer /> 
      <Lightdark />
    </div>
  );
}
