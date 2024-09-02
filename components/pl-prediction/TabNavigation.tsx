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
        className={`tab ${pathname === "/pl-prediction" ? "tab-active" : ""}`}
      >
        League Table Prediction
      </Link>
      <Link
        href=""
        onClick={(e) => e.preventDefault()}
        className="tab tab-bordered tooltip"
      >
        <div className="tooltip" data-tip="Coming Soon">
          <span>Match Predictions</span>
        </div>
      </Link>
      <Link
        href="/pl-prediction/about"
        className={`tab ${
          pathname === "/pl-prediction/about" ? "tab-active" : ""
        }`}
      >
        About
      </Link>
    </div>
  );
};

export default TabNavigation;
