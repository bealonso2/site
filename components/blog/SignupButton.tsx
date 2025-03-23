"use client";
import { config } from "@/config";
import { useEffect, useRef } from "react";

const SignupForm = () => {
  const formRef = useRef(null);

  useEffect(() => {
    // Ensure the script is added only once
    // @ts-ignore
    if (!formRef.current || formRef.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js";
    script.async = true;
    script.dataset.buttonColor = "#000000";
    script.dataset.buttonTextColor = "#FFFFFF";
    script.dataset.site = config.bearblog_url;
    script.dataset.locale = "en";

    // @ts-ignore
    formRef.current.appendChild(script);
  }, []);

  return (
    <div
      ref={formRef}
      style={{
        minHeight: "58px",
        maxWidth: "440px",
        margin: "0 auto",
        width: "100%",
      }}
    />
  );
};

export default SignupForm;
