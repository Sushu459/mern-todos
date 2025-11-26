import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import TodoItem from "../components/TodoItem";
import api from "../api/axiosInstance";

const Completed = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const fetchCompleted = async () => {
    try {
      setError("");
      const res = await api.get("/todos", {
        params: {
          status: "completed",
          sortBy: "updatedAt",
          sortOrder: "desc",
        },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching completed todos:", err);
      setError(
        err.response?.data?.message || "Failed to load completed tasks."
      );
    }
  };

  useEffect(() => {
    fetchCompleted();
  }, []);

  const handleToggle = async (id) => {
    try {
      await api.patch(`/todos/${id}/toggle-status`);
      // if user un-completes a task, remove from this list
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
            Completed tasks ✅
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Review everything you&apos;ve finished.
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
              No completed tasks yet. Mark something as done 🎉
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

export default Completed;
