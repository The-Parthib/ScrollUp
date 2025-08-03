import * as React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import { BadgePlus, Home, Image, LogOut, Tornado, User } from "lucide-react";
import { useUserAuth } from "@/context/AuthContext";
import { NavLink } from "react-router-dom";

interface ISidebarProps {}

const navItems = [
  {
    title: "Home",
    link: "/",
    icon: Home,
  },
  {
    title: "Profile",
    link: "/profile",
    icon: User,
  },
  {
    title: "Add Post",
    link: "/create-post",
    icon: BadgePlus,
  },
  {
    title: "My Posts",
    link: "/my-photos",
    icon: Image,
  },
  {
    title: "Logout",
    link: "#",
    icon: LogOut,
  },
];

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
  const { logOut } = useUserAuth();

  return (
    <nav className="flex flex-col relative h-screen max-w-sm w-full">
      <div className="flex justify-center m-5">
        <div className=" flex justify-center items-center text-4xl font-extrabold">ScrollUp
            <Tornado/>
        </div>
      </div>
      {navItems.map((item) => (
        <div className="flex items-center p-4" key={item.title}>
          {item.title === "Logout" ? (
            <div
              className="flex items-center font-semibold cursor-pointer text-red-600 hover:text-red-800"
              onClick={logOut}
            >
              <item.icon className="w-5 h-5 mr-2" />
              <span>{item.title}</span>
            </div>
          ) : (
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `flex items-center font-semibold ${
                  isActive
                    ? "text-blue-500 font-semibold"
                    : "hover:text-orange-500 dark:hover:text-orange-400"
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-2" />
              <span>{item.title}</span>
            </NavLink>
          )}
        </div>
      ))}
      <div className="mt-auto p-4">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Sidebar;
