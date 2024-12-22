import React from "react";
import Logo from "@/components/Logo";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="py-3 w-full px-5 rounded-md border  flex justify-between items-center">
      <Logo />
      <div className="flex gap-5 items-center">
        <Avatar className="self-end">
          <AvatarImage src="user.png" />
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
