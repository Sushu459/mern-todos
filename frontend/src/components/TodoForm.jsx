import { useState } from "react";
import GlassCard from "./GlassCard";

const TodoForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const priorityIcons = {
    low: "🔵",
    medium: "🟡",
    high: "🔴",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (title.trim().length < 3) {
      setError("Task title must be at least 3 characters.");
      return;
    }

    setError("");
    setIsLoading(true);

    if (typeof onCreate === "function") {
      onCreate({ 
        title: title.trim(), 
        priority,
        status: "pending",
        createdAt: new Date().toISOString()
      });
    } else {
      console.warn("onCreate prop is not a function!");
    }

    // Reset form
    setTimeout(() => {
      setTitle("");
      setPriority("medium");
      setIsLoading(false);
    }, 300);
  };

  return (
    <GlassCard className="mb-6" variant="interactive">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Group */}
        <div className="relative">
          <input
            type="text"
            placeholder="What do you want to get done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm 
              outline-none transition-all duration-200
              focus:border-cyan-400/70 focus:bg-white/8 focus:shadow-lg focus:shadow-cyan-500/20
              disabled:opacity-60 disabled:cursor-not-allowed
              placeholder:text-slate-400"
            aria-label="Task title"
          />
          {title && (
            <span className="absolute right-4 top-3 text-xs text-slate-400">
              {title.length}/100
            </span>
          )}
        </div>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Priority Selector */}
         <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  disabled={isLoading}
  className=" rounded-2xl px-4 py-3 text-sm font-medium cursor-pointer 
  bg-white/10 backdrop-blur-md border border-white/15 text-slate-200
   transition-all duration-200 focus:outline-none focus:ring-2 
   focus:ring-cyan-400/70 hover:bg-white/15 hover:border-white/25 
   disabled:opacity-60 disabled:cursor-not-allowed "
  aria-label="Task priority"
>
  <option
    value="low"
    className="bg-[#0d0f14] text-slate-200 hover:bg-[#1b1e27]"
  >
    🔵 Low Priority
  </option>

  <option
    value="medium"
    className="bg-[#0d0f14] text-amber-300 hover:bg-amber-900"
  >
    🟡 Medium Priority
  </option>

  <option
    value="high"
    className="bg-[#0d0f14] text-red-300 hover:bg-red-900"
  >
    🔴 High Priority
  </option>
</select>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 
              px-6 py-3 text-sm font-semibold text-white
              shadow-lg shadow-cyan-500/40 transition-all duration-200
              hover:shadow-cyan-500/60 hover:scale-105
              active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none
              flex items-center justify-center gap-2"
            aria-label="Add task"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Adding...
              </>
            ) : (
              <>
                <span>➕</span>
                Add Task
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 
              rounded-2xl px-4 py-2 flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </p>
          </div>
        )}

        {/* Helper Text */}
        <p className="text-xs text-slate-400 px-4">
          💡 Pro tip: Add a title and select priority level, then click Add Task
        </p>
      </form>
    </GlassCard>
  );
};

export default TodoForm;