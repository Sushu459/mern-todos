import GlassCard from "./GlassCard";

const statusConfig = {
  pending: {
    bg: "rgba(234, 179, 8, 0.15)",
    text: "#fbbf24",
    border: "rgba(234, 179, 8, 0.4)",
    label: "📋 Pending",
    icon: "⏱️"
  },
  in_progress: {
    bg: "rgba(59, 130, 246, 0.15)",
    text: "#60a5fa",
    border: "rgba(59, 130, 246, 0.4)",
    label: "🚀 In Progress",
    icon: "⚡"
  },
  completed: {
    bg: "rgba(34, 197, 94, 0.15)",
    text: "#4ade80",
    border: "rgba(34, 197, 94, 0.4)",
    label: "✅ Completed",
    icon: "🎉"
  },
};

const priorityConfig = {
  low: {
    icon: "🔵",
    color: "#64748b",
    label: "Low Priority",
  },
  medium: {
    icon: "🟡",
    color: "#f59e0b",
    label: "Medium Priority",
  },
  high: {
    icon: "🔴",
    color: "#ef4444",
    label: "High Priority",
  },
};

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const status = todo.status || "pending";
  const priority = todo.priority || "medium";
  const statusInfo = statusConfig[status];
  const priorityInfo = priorityConfig[priority];
  const isCompleted = status === "completed";

  const handleToggleStatus = () => {
    const nextStatus =
      status === "pending"
        ? "in_progress"
        : status === "in_progress"
        ? "completed"
        : "pending";

    onToggle(todo._id || todo.id, nextStatus);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      onDelete(todo._id || todo.id);
    }
  };

  return (
    <GlassCard 
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 
        py-4 px-5 transition-all duration-300 
        ${isCompleted ? "opacity-75" : "hover:shadow-lg"}`}
      variant="interactive"
    >
      {/* Left Content */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        {/* Checkbox */}
        <button
          onClick={handleToggleStatus}
          className={`flex-shrink-0 mt-1 h-6 w-6 rounded-lg border-2 transition-all duration-300
            flex items-center justify-center cursor-pointer
            ${
              isCompleted
                ? "bg-emerald-500/30 border-emerald-400 text-emerald-300"
                : "border-white/20 hover:border-white/40 hover:bg-white/5"
            }`}
          title={`Mark as ${status === "pending" ? "in progress" : "completed"}`}
          aria-label="Toggle task status"
        >
          {isCompleted ? "✓" : ""}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className={`text-sm font-semibold transition-all duration-300
              ${
                isCompleted
                  ? "line-through text-slate-400"
                  : "text-slate-100"
              }`}
          >
            {todo.title}
          </h3>

          {/* Description */}
          {todo.description && (
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {todo.description}
            </p>
          )}

          {/* Metadata Badges */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Status Badge */}
            {statusInfo && (
              <span
                className="px-3 py-1 rounded-full border text-xs font-medium transition-all duration-200
                  hover:shadow-md"
                style={{
                  backgroundColor: statusInfo.bg,
                  color: statusInfo.text,
                  borderColor: statusInfo.border,
                }}
                title={statusInfo.label}
              >
                {statusInfo.icon} {statusInfo.label}
              </span>
            )}

            {/* Priority Badge */}
            {priorityInfo && (
              <span
                className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
                style={{ color: priorityInfo.color }}
                title={priorityInfo.label}
              >
                {priorityInfo.icon} {priorityInfo.label}
              </span>
            )}

            {/* Created Date */}
            {todo.createdAt && (
              <span className="text-xs text-slate-400 ml-auto sm:ml-2">
                📅 {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          onClick={() => onToggle(todo._id || todo.id, "in_progress")}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
            text-cyan-300 hover:text-cyan-200 text-xs font-medium transition-all duration-200
            border border-cyan-500/30 hover:border-cyan-500/50"
          title="Mark as in progress"
          aria-label="Progress button"
        >
          ⚡ Progress
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 
            text-red-300 hover:text-red-200 text-xs font-medium transition-all duration-200
            border border-red-500/30 hover:border-red-500/50"
          title="Delete task"
          aria-label="Delete button"
        >
          🗑️ Delete
        </button>
      </div>
    </GlassCard>
  );
};

export default TodoItem;