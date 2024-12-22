"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({width,height}:LogoProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <div>
      {resolvedTheme === "dark" ? (
        <Image
          alt='Fontify'
          src={"/img/fontify-light.svg"}
          width={95}
          height={95}
        />
      ) : (
        <Image
          alt='Fontify'
          src={"/img/fontify-dark.svg"}
          width={width ? width : 95}
          height={height ? height : 95}
        />
      )}
    </div>
  );
};

export default Logo;
