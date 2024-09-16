"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabNavigation = () => {
  const pathname = usePathname();

  return (
    <div
      role="tablist"
      className="tabs tabs-lifted tabs-xs sm:tabs-sm md:tabs-md lg:tabs-lg"
    >
      <Link
        href="/pl-prediction"
        className={`tab ${pathname.startsWith("/pl-prediction") && pathname === "/pl-prediction" ? "tab-active" : ""}`}
      >
        League Table Prediction
      </Link>
      <Link
        href="/pl-prediction/matches"
        className={`tab ${pathname.startsWith("/pl-prediction/matches") ? "tab-active" : ""}`}
      >
        Match Predictions
      </Link>
      <Link
        href="/pl-prediction/about"
        className={`tab ${pathname.startsWith("/pl-prediction/about") ? "tab-active" : ""}`}
      >
        About
      </Link>
    </div>
  );
};

export default TabNavigation;
