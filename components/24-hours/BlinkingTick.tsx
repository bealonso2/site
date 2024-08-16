"use client";

import React, { useState, useEffect } from "react";

export default function BlinkingTick() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return <span style={{ opacity: isVisible ? 100 : 0 }}>:</span>;
}
