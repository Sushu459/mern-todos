import { NavLink } from "react-router-dom";
import GlassCard from "./GlassCard";

const navClasses = ({ isActive }) =>
  `block px-4 py-2 rounded-2xl text-sm transition ${
    isActive
      ? "bg-primary/80 text-white shadow-lg"
      : "text-slate-200 hover:bg-white/10"
  }`;

const Sidebar = () => {
  return (
    <div className="px-6 pb-6">
      <GlassCard className="h-full">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Menu
          </p>
          <nav className="space-y-2">
            <NavLink to="/" className={navClasses} end>
              Dashboard
            </NavLink>
            <NavLink to="/completed" className={navClasses}>
              Completed
            </NavLink>
            <NavLink to="/today" className={navClasses}>
              Today
            </NavLink>
          </nav>
        </div>
      </GlassCard>
    </div>
  );
};

export default Sidebar;
