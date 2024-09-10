import { NavLink, useLocation } from "react-router-dom";
import { bottombarLinks } from "../../constants";
import SvgIcon from "../shared/SvgIcon";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bottom-bar-container">
      <ul className="bottom-bar-navlink-ul">
        {bottombarLinks.map((link) => {
          const isActive = link.route === pathname;

          return (
            <li key={link.label}>
              <NavLink className={`bottom-bar-navlink ${isActive && 'selected'}`} to={link.route}>
                <SvgIcon
                  path={link.path}
                  viewbox={link.viewbox}
                  width="25px"
                  height="25px"
                />
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BottomBar;
