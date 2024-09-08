"use client";

export default function PrintButton() {
  // This doesn't work on Safari for some reason
  const handlePrint = () => {
    window.print();
  };
  return (
    <button onClick={handlePrint} className="self-center">
      Download as PDF
    </button>
  );
}
