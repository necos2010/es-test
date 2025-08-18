import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../../assets/photo_2022-12-24_12-20-50.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import "./Loading.css";

function Loading() {
  const navigate = useNavigate();
useEffect(() => {
  const timer = setTimeout(() => {
    navigate("/questions");
  }, 2500);
  return () => clearTimeout(timer);
}, [navigate]);

  return (
    <div className="Loading-page">
      <div className="Loading-content">
        <img src={MainLogo} alt="Logo" className="Loading-logo" />
        <CircularProgress style={{ color: "#0a0c0a", marginTop: "30px" }} />
      </div>
    </div>
  );
}

export default Loading;
