import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext.tsx";
import { sidebarLinks } from "../../constants/index";
import SvgIcon from "../shared/SvgIcon.tsx";
import Button from "../shared/Button.tsx";

const LeftSidebar = () => {
  // getting the pathname from the url for checking active tab
  const { pathname } = useLocation();

  // getting user data and logout function from context
  const { logout, user } = useAuth();

  const handleClick = async () => {
    await logout();
  };

  return (
    <nav className="left-sidebar-container">
      {/* The main website logo */}
      <Link to="/">
        <img
          width={165}
          src="../../public/assets/icons/logo-name.png"
          alt="Chirpify"
        />
      </Link>

      {/* Profile section */}
      <Link style={{ textDecoration: "none" }} to={`/profile/${user?.id}`}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img
            width={50}
            src="../../public/assets/icons/profile.png"
            alt="Chirpify"
          />
          <div style={{ flex: "1" }}>
            <p
              style={{
                fontFamily: "Montserrat",
                color: "#EEEEEE",
                fontWeight: "800",
                fontSize: "20px",
              }}
            >
              {user?.name}
            </p>
            <p
              style={{
                fontFamily: "Russo One",
                color: "#76ABAE",
                fontWeight: "100",
                fontSize: "15px",
              }}
            >
              @{user?.username}
            </p>
          </div>
        </div>
      </Link>

      {/* Navlinks */}
      <ul className="left-sidebar-navlink-ul">
        {sidebarLinks.map((link) => {
          // checks if the pathname matches the route in the navlink
          const isActive = pathname === link.route;

          return (
            <li className="left-sidebar-navlink-li" key={link.label}>
              <NavLink
                className={`left-sidebar-navlink ${isActive && "selected"}`}
                to={link.route}
              >
                <SvgIcon
                  path={link.path}
                  viewbox={link.viewbox}
                  width="20px"
                  height="20px"
                />
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <Button className="logout-button" type="button" onClick={handleClick}>
        <SvgIcon
          viewbox="0 0 384.971 384.971"
          width="20px"
          height="20px"
          path={[
            "M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03C192.485,366.299,187.095,360.91,180.455,360.91z",
            "M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z",
          ]}
        />
        Logout
      </Button>
    </nav>
  );
};

export default LeftSidebar;
