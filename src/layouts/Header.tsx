import "./Header.css";
import YellowLogo from "../assets/Yellow-logo.svg";

function Header() {
  return (
    <header className="Header">
      <div className="Header-wrapper">
        <img src={YellowLogo} alt="Edford School logo" className="Header-logo" />
        <div className="Header-text">
          <p className="Header-edford">Edford</p>
          <p className="Header-school">School</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
