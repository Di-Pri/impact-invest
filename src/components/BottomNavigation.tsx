import React from "react";
import { Link } from "react-router-dom";
import { MenuIcon, HomeIcon, WatchlistIcon, PortfolioIcon, AcademyIcon } from "../assets";

export interface BottomNavigationProps {}

const BottomNavigation: React.FC<BottomNavigationProps> = (props) => {
  const navPages = [
    { link: "/", icon: <HomeIcon />, text: "Home" },
    { link: "/watchlist", icon: <WatchlistIcon />, text: "Watchlist" },
    { link: "/portfolio", icon: <PortfolioIcon />, text: "Portfolio" },
    { link: "/academy", icon: <AcademyIcon />, text: "Academy" },
    { link: "/menu", icon: <MenuIcon />, text: "Menu" },
  ];
  return (
    <div className="bottom-navigation">
      {navPages.map((page) => (
        <div key={page.link}>
          <Link className="bottom-nav-icons" to={page.link}>
            {page.icon}
            <p>{page.text}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BottomNavigation;
