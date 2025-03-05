import { Link } from "react-router-dom"; //link เป็น Component ในการ ์navigate ไปหน้าอื่น ๆ
import SearchInput from "./SearchInput";
import logo from "../assets/DALL_E-2025-03-05-15.52.20-A-completely-blank-and-empty-design-with-no-text_-symbols_-or-graphics-removebg-preview.png";

export default function Header() {
  return (
    <header className=" top-0 left-0 w-full bg-black bg-opacity-50  z-50 flex justify-between items-center p-2 sticky">
      <div className="flex items-center gap-5 ">
        <img
          alt="AnimeVault Logo"
          loading="lazy"
          width="70"
          height="70"
          decoding="async"
          data-nimg="1"
          className="object-contain"
          style={{ color: "transparent" }}
          src={logo}
        />
        <a href="/">
          <h1 className="text-white font-bold text-3xl">COSMOS</h1>
        </a>
      </div>
      <div className="flex items-center gap-10">
        <Link to='/'className="text-white font-bold text-xl">Home</Link>
        <Link to='/myfavorite' className="text-white font-bold text-xl">My favorite</Link>
        <div className="flex items-center">
          <SearchInput />
        </div>
      </div>
    </header>
  );
}
