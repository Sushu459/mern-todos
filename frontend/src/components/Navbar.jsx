import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import GlassCard from "./GlassCard";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="px-6 py-4">
      <GlassCard className="flex items-center justify-between py-3 px-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold">
            PT
          </div>
          <span className="font-semibold tracking-wide text-slate-100">
            ProTask
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {user && (
            <>
              <span className="text-slate-200">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>
              <Link
                to="/profile"
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1 rounded-full bg-red-500/80 hover:bg-red-500 text-xs font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default Navbar;
