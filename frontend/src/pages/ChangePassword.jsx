import { useState } from "react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import api from "../api/axiosInstance";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const res = await api.put("/users/me/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setMsg(res.data.message || "Password updated successfully.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update password. Try again."
      );
    }
  };

  return (
    <Layout>
      <div className="max-w-lg">
        <GlassCard>
          <h2 className="text-lg font-semibold mb-4 text-slate-50">
            Change password
          </h2>

          {msg && (
            <p className="mb-3 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl px-3 py-2">
              {msg}
            </p>
          )}
          {error && (
            <p className="mb-3 text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-2xl px-3 py-2">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="text-xs text-slate-300">Current password</label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary/70"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300">New password</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary/70"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300">
                Confirm new password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary/70"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold shadow-lg shadow-primary/40"
            >
              Update password
            </button>
          </form>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default ChangePassword;
