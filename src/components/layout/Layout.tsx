import * as React from "react";
import UserList from "@/components/userList/UserList";
import Sidebar from "../sideBar/SideBar";

interface ILayoutProps {
    children:React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({children}) => {
  return (
    <div className="flex">
      <aside className="flex gap-x-4 border-orange-500 border-dotted border-2 fixed top-0 left-1 z-40 lg:w-60 h-screen">
        <Sidebar />
      </aside>
      <div className="lg:ml-60 lg:mr-60 p-8 flex-1 w-5xl ml-36">{children}</div>
      <aside className="hidden lg:block border-orange-500 border-dotted border-2 fixed top-0 right-1 z-40 lg:w-60 h-screen">
        <UserList/>
      </aside>
    </div>
  );
};

export default Layout;
