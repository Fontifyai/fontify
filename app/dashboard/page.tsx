import React from "react";
import Aside from "./_components/Aside";
import Output from "./_components/Output";
import Lightdark from "@/components/LandingPage/light-dark";

export default function page() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4">
      <Aside />
      <Output />
      <Lightdark />
    </div>
  );
}
