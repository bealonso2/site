"use client";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };
  return (
    <button onClick={handlePrint} className="self-center">
      Download as PDF
    </button>
  );
}
