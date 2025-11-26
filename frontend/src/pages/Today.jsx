import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import TodoItem from "../components/TodoItem";
import api from "../api/axiosInstance";

const Today = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const fetchToday = async () => {
    try {
      setError("");
      const res = await api.get("/todos", {
        params: {
          status: "pending",
          sortBy: "createdAt",
          sortOrder: "asc",
        },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching today todos:", err);
      setError(err.response?.data?.message || "Failed to load tasks.");
    }
  };

  useEffect(() => {
    fetchToday();
  }, []);

  const handleToggle = async (id) => {
    try {
      await api.patch(`/todos/${id}/toggle-status`);
      // once completed, remove from "Today" list
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error toggling:", err);
      alert("Failed to update task status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        <GlassCard>
          <h2 className="text-xl font-semibold text-slate-50">
            Today&apos;s focus 🌞
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Pending tasks that still need your attention.
          </p>
          {error && (
            <p className="mt-3 text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-2xl px-3 py-2">
              {error}
            </p>
          )}
        </GlassCard>

        <div className="space-y-3">
          {todos.length === 0 && (
            <p className="text-sm text-slate-300">
              You&apos;re all caught up for today 🤩
            </p>
          )}
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Today;
