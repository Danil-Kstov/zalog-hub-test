import { useState } from "react";
import type { Task } from "../../tasks.ts";

type Filter = "all" | Task["status"];

type MainProps = {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  storageError: string;
};

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

const Main = ({ tasks, onToggleTask, storageError }: MainProps) => {
  const [filter, setFilter] = useState<Filter>("all");
  const visibleTasks = filter === "all"
    ? tasks
    : tasks.filter((task) => task.status === filter);

  return (
    <main className="flex-1 px-4 py-8">
      <div className="flex justify-end" aria-label="Task filter">
        {filters.map(({ value, label }, index) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 font-bold text-white hover:bg-blue-600 ${
              filter === value ? "bg-blue-700" : "bg-blue-400"
            } ${index === 0 ? "rounded-l-2xl" : ""} ${
              index === filters.length - 1 ? "rounded-r-2xl" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="mx-auto mt-8 max-w-3xl">
        <h2 className="mb-6 text-center text-2xl font-bold">Tasks</h2>

        {storageError && <p role="alert" className="mb-4 text-red-600">{storageError}</p>}

        {visibleTasks.length === 0 ? (
          <p className="text-center text-slate-500">
            {filter === "all" ? "No tasks yet." : `No ${filter} tasks.`}
          </p>
        ) : (
          <ul className="space-y-3">
            {visibleTasks.map((task) => {
              const isDone = task.status === "done";

              return (
                <li
                  key={task.id}
                  className={`flex items-start gap-4 rounded-xl border p-4 shadow-sm ${
                    isDone
                      ? "border-slate-200 bg-slate-100"
                      : "border-blue-100 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => onToggleTask(task.id)}
                    aria-label={`Mark ${task.title} as ${isDone ? "active" : "done"}`}
                    className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className={`break-words font-semibold ${
                      isDone ? "text-slate-500 line-through" : "text-slate-900"
                    }`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className={`mt-1 whitespace-pre-wrap break-words text-sm ${
                        isDone ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {task.description}
                      </p>
                    )}
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                    isDone
                      ? "bg-slate-200 text-slate-600"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {isDone ? "Done" : "Active"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Main;
