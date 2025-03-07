import katex from "katex";
import "katex/dist/katex.min.css";

interface EquationProps {
  text: string;
}

export default function Equation({ text }: EquationProps) {
  // Render KaTeX to HTML string on the server
  const html = katex.renderToString(text, {
    output: "html", // Ensures HTML output
  });

  // Return pre-rendered HTML with dangerouslySetInnerHTML
  return (
    <div
      className="my-6 text-center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
