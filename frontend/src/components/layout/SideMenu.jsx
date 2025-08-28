import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
const MENU_ITEMS = [
  {
    name: "Profile",
    url: "/me/profile",
    icon: "fas fa-user",
  },
  {
    name: "Update Profile",
    url: "/me/update_profile",
    icon: "fas fa-user",
  },
  {
    name: "Upload Avatar",
    url: "/me/upload_avatar",
    icon: "fas fa-user-circle",
  },
  {
    name: "Update Password",
    url: "/me/update_password",
    icon: "fas fa-lock",
  },
];

const SideMenu = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleClick = (itemUrl) => {
    setActiveItem(itemUrl);
  };
  return (
    <div className="list-group mt-5 pl-4">
      {MENU_ITEMS.map((item, index) => (
        <Link
          key={index}
          to={item.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeItem.includes(item.url) ? "active" : ""
          }`}
          aria-current={activeItem.includes(item.url) ? "true" : "false"}
          onClick={() => handleClick(item.url)}
        >
          <i className={`${item.icon} fa-fw pe-2`}></i> {item.name}
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
