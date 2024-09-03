// TODO:  Implement the topbar: Making the logo appear here and signout and profile picture

import { useAuth } from "../../lib/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import LogoutIcon from '../../../public/assets/icons/LogoutIcon.tsx';

const TopBar = () => {
  // Declaring necessary variables
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // this will handle logout
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="top-bar-container">
      {/* Main app logo */}
      <img
        style={{ height: "40px", cursor: "pointer" }}
        src="../../public/assets/icons/main-logo.png"
        alt="Chirpify"
        onClick={() => navigate(`/`)}
      />

      {/* Profile and logout section */}
      <section style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {/* Profile picture */}
        <img
          src="../../public/assets/icons/profile.png"
          onClick={() => navigate(`/profile/${user?.id}`)}
          style={{ height: "40px", cursor: "pointer" }}
        />

        {/* Logout */}
        <Button className="btn" type="button" onClick={handleLogout}>
          <LogoutIcon />
        </Button>
      </section>
    </div>
  );
};

export default TopBar;
