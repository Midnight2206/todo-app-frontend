import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Code } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
  { name: "Bypass", path: "/bypass", icon: <Code className="w-5 h-5" /> },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-48 min-h-screen gap-2 p-4 bg-white border-r border-gray-200">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-500 text-white font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}
    </aside>
  );
}
