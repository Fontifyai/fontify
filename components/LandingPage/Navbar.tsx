"use client";
import React from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const navLinks = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "Pricing",
      href: "#pricing",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  const router = useRouter();

  return (
    <div className='w-full py-5 px-16 border-b flex justify-between items-center'>
      <div>
        <Logo />
      </div>
      <div className='flex text-sm gap-10'>
        {navLinks.map((link, index) => (
          <Link href={link.href} key={index}>
            {link.name}
          </Link>
        ))}
      </div>
      <div className='flex gap-5'>
        <Button variant={"outline"} className="hover:border-2 w-20" onClick={() => router.push("/dashboard")}>
          {/* Login */}
          Dashbaord
        </Button>
        {/* <Button className="w-20" onClick={() => router.push("/sign-up")}>Signup</Button> */}
      </div>
    </div>
  );
};

export default Navbar;


