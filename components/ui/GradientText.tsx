import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
