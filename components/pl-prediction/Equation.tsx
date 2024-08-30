"use client";
import React, { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS for styling

interface EquationProps {
  text: string;
}

const Equation: React.FC<EquationProps> = ({ text }) => {
  const equationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (equationRef.current) {
      // Clear the content of the div before rendering the LaTeX string
      equationRef.current.innerHTML = "";
      katex.render(text, equationRef.current, {
        throwOnError: false,
      });
    }
  }, [text]);

  return <div ref={equationRef} className="flex flex-col items-center my-8" />;
};

export default Equation;
