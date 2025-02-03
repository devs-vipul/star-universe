import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Users,
  Atom,
  Heart,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsCollapsed]);

  return (
    <aside
      className={cn(
        "bg-background-elevated h-full text-text-primary fixed left-0 top-0 transition-all",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col gap-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-background-muted rounded-md absolute -right-4 top-4 text-text-muted"
        >
          {!isCollapsed ? (
            <PanelLeftClose size={24} />
          ) : (
            <PanelLeftOpen size={24} />
          )}
        </button>
        {/* <div className="px-4 pt-8 flex items-center justify-start gap-2">
          <Atom size={28} className="animate-zoom text-background-active" />
          {!isCollapsed && (
            <span className="text-2xl font-bold">Star Universe</span>
          )}
        </div> */}
        <NavLink
          to="/"
          className="px-4 pt-8 flex items-center justify-start gap-2"
        >
          <Atom size={28} className="animate-zoom text-background-active" />
          {!isCollapsed && (
            <span className="text-2xl font-bold">Star Universe</span>
          )}
        </NavLink>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-2 p-2 px-4 transition-all text-lg",
                isActive
                  ? "text-text-primary font-semibold border-l-4 border-background-active"
                  : "text-text-muted hover:bg-gray-800",
                isCollapsed && "justify-center"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Users
                  size={20}
                  className={cn(
                    isActive ? "text-background-active" : "text-text-muted"
                  )}
                  fill={isActive ? "currentColor" : ""}
                />
                {!isCollapsed && <span>Characters</span>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-2 p-2 px-4 transition-all text-lg",
                isActive
                  ? "text-text-primary font-semibold border-l-4 border-background-active"
                  : "text-text-muted hover:bg-gray-800",
                isCollapsed && "justify-center"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Heart
                  size={20}
                  className={cn(
                    isActive ? "text-background-active" : "text-text-muted"
                  )}
                  fill={isActive ? "currentColor" : ""}
                />
                {!isCollapsed && <span>Favorites</span>}
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
