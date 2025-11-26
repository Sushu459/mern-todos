import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import api from "../api/axiosInstance";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchTodos = async (searchQuery = "") => {
    try {
      setError("");
      const res = await api.get("/todos", {
        params: { search: searchQuery, sortBy: "createdAt", sortOrder: "desc" },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError(err.response?.data?.message || "Failed to load tasks.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (payload) => {
    try {
      setError("");
      const res = await api.post("/todos", payload);
      // add new todo to top
      setTodos((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Error creating todo:", err);
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await api.patch(`/todos/${id}/toggle-status`);
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error toggling todo:", err);
      alert("Failed to update task status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      alert("Failed to delete task");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchTodos(search);
  };

  return (
    <Layout>
      <div className="space-y-4">
        <GlassCard>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-50">
                Today&apos;s tasks
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Prioritize, focus, and crush your list 💪
              </p>
            </div>
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <input
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 md:flex-none rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary/70"
              />
              <button
                type="submit"
                className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-slate-100 hover:bg-white/20"
              >
                Search
              </button>
            </form>
          </div>
          {error && (
            <p className="mt-3 text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-2xl px-3 py-2">
              {error}
            </p>
          )}
        </GlassCard>

        <TodoForm onCreate={handleCreate} />

        <div className="space-y-3">
          {todos.length === 0 && (
            <p className="text-sm text-slate-300">
              No tasks yet. Add your first one above ✨
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

export default Dashboard;
