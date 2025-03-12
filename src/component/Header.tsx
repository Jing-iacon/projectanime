import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import logo from "../assets/DALL_E-2025-03-05-15.52.20-A-completely-blank-and-empty-design-with-no-text_-symbols_-or-graphics-removebg-preview.png";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="top-0 left-0 w-full bg-black bg-opacity-50 z-50 sticky">
      <div className="flex flex-col md:flex-row md:justify-between items-center p-2">
        <div className="flex items-center gap-5 w-full md:w-auto justify-between">
          <div className="flex items-center gap-5">
            <img
              alt="AnimeVault Logo"
              loading="lazy"
              width="70"
              height="70"
              decoding="async"
              data-nimg="1"
              className="object-contain w-[50px] md:w-[70px]"
              style={{ color: "transparent" }}
              src={logo}
            />
            <a href="/">
              <h1 className="text-white font-bold text-2xl md:text-3xl">COSMOS</h1>
            </a>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center gap-5 md:gap-10 w-full md:w-auto py-4 md:py-0`}
        >
          <Link to="/" className="text-white font-bold text-xl">
            Home
          </Link>
          <Link to="/myfavorite" className="text-white font-bold text-xl">
            My favorite
          </Link>
          <div className="flex items-center w-full md:w-auto">
            <SearchInput />
          </div>
        </div>
      </div>
    </header>
  );
}
