import React from "react";
import Aside from "./_components/Aside";
import Output from "./_components/Output";

export default function page() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      <Aside />
      <Output />
    </div>
  );
}
