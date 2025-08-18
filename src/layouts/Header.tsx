import "./Header.css";
import YellowLogo from "../assets/Header-logo.png";

function Header() {
  return (
    <header className="Header">
      <div className="Header-wrapper">
        <img src={YellowLogo} alt="Edford School logo" className="Header-logo" />
      </div>
    </header>
  );
}

export default Header;
