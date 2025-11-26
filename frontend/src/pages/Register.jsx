import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import GlassCard from "../components/GlassCard";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await register(form.name, form.email, form.password);
    if (res.success) navigate("/");
    else setError(res.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <GlassCard className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2 text-slate-50">
          Create account ✨
        </h1>
        <p className="text-sm text-slate-300 mb-6">
          Join ProTask and organize your day.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/40 rounded-2xl px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary/70"
            />
          </div>
          <div>
            <label className="text-xs text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary/70"
            />
          </div>
          <div>
            <label className="text-xs text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary/70"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-2xl bg-gradient-to-r from-primary to-accent py-2.5 text-sm font-semibold shadow-lg shadow-primary/40 disabled:opacity-70"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-300 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default Register;
