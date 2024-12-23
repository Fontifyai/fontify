"use client";
import React, { useEffect, useState } from "react";
import {
  Inter,
  Pacifico,
  Meow_Script,
  // Sour_Gummy,
  Barrio,
  Offside,
  Special_Elite,
} from "next/font/google";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

// Import Google Fonts
const inter = Inter({ subsets: ["latin"], weight: "400" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const meow = Meow_Script({ subsets: ["latin"], weight: "400" });
// const sour = Sour_Gummy({ subsets: ["latin"], weight: "400" });
const barrio = Barrio({ subsets: ["latin"], weight: "400" });
const offside = Offside({ subsets: ["latin"], weight: "400" });
const selite = Special_Elite({ subsets: ["latin"], weight: "400" });

const Hero = () => {
  const fontsFontify = [
    inter.className,
    pacifico.className,
    meow.className,
    // sour.className,
    barrio.className,
    offside.className,
    selite.className,
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % fontsFontify.length);
    }, 500);
    return () => clearInterval(interval);
  }, [fontsFontify.length]);

  return (
    <main className="min-h-screen py-32 space-y-7 flex flex-col items-center">
      <div className="md:text-6xl text-5xl text-center font-bold">Generate your fonts</div>
      <div className="flex gap-5 items-center">
        <h2 className="md:text-5xl text-4xl">with</h2>
        <h2
          className={`md:text-5xl text-4xl transition-all w-40 duration-500 ease-in ${fontsFontify[activeIndex]}`}
        >
          Fontify
        </h2>
      </div>
      <div className=" flex-col justify-center items-center text-center w-full max-w-4xl">
        <h3 className="text-sm">
          <span className="font-bold">FONTIFY</span> is an AI-powered web
          application for generating customizable serif, sans-serif, display,
          and other font styles for designers, developers, and content creators.
        </h3>
      </div>
      <div className="flex md:flex-row flex-col gap-5">
        <Button className="md:w-32 w-full" onClick={() => router.push("/dashboard")}>
          Get Started
        </Button>
        <Button variant={"outline"} className="hover:border-2 md:w-32 w-full">
          Learn More
        </Button>
      </div>
    </main>
  );
};

export default Hero;
