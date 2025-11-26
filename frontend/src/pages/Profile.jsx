import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", avatar: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/users/me");
      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        avatar: res.data.avatar || "",
      });
    };
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const res = await api.put("/users/me", form);
    setUser((prev) => ({ ...prev, ...res.data }));
    localStorage.setItem("protask_user", JSON.stringify(res.data));
    setMsg("Profile updated successfully.");
  };

  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-2">
        <GlassCard>
          <h2 className="text-lg font-semibold mb-4 text-slate-50">
            Profile
          </h2>
          {msg && (
            <p className="mb-3 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl px-3 py-2">
              {msg}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="text-xs text-slate-300">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
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
                className="mt-1 w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary/70"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300">Avatar URL</label>
              <input
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary/70"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold shadow-lg shadow-primary/40"
            >
              Save changes
            </button>
          </form>
        </GlassCard>

        <GlassCard>
          <h2 className="text-lg font-semibold mb-4 text-slate-50">
            Security
          </h2>
          <p className="text-sm text-slate-300 mb-3">
            Keep your account safe by using a strong password.
          </p>
          <Link
            to="/change-password"
            className="inline-block rounded-2xl bg-white/10 border border-white/20 px-4 py-2 text-xs hover:bg-white/20"
          >
            Change password
          </Link>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default Profile;
