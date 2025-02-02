import React from "react";
import { NavLink } from "react-router-dom";
import { Users, Atom, Heart } from "lucide-react";
import { cn } from "../lib/utils";

const Sidebar: React.FC = () => {
  return (
    <aside
      className={cn(
        "w-64 bg-background-elevated text-text-primary h-screen fixed left-0 top-0"
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="p-4 flex items-center justify-start gap-2">
          <Atom size={28} className="animate-zoom text-background-active" />
          <span className="text-2xl font-bold">Star Universe</span>
        </div>

        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-2 p-2 px-4 transition-all text-lg",
                isActive
                  ? "text-text-primary font-semibold border-l-4 border-background-active"
                  : "text-text-muted hover:bg-gray-800"
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
                <span>Characters</span>
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
                  : "text-text-muted hover:bg-gray-800"
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
                <span>Favorites</span>
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
