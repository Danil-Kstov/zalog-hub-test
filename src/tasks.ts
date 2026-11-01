export type Task = {
  id: string;
  title: string;
  description: string;
  status: "active" | "done";
};

const TASKS_STORAGE_KEY = "zalog-hub.tasks";

export function readTasks(): Task[] {
  try {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((task): task is Task =>
      typeof task === "object" && task !== null &&
      typeof task.id === "string" &&
      typeof task.title === "string" &&
      typeof task.description === "string" &&
      (task.status === "active" || task.status === "done")
    );
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(title: string, description: string): Task[] {
  const tasks = [...readTasks(), {
    id: crypto.randomUUID(),
    title,
    description,
    status: "active" as const,
  }];

  saveTasks(tasks);
  return tasks;
}

export function toggleTask(id: string): Task[] {
  const tasks = readTasks().map((task) =>
    task.id === id
      ? { ...task, status: task.status === "active" ? "done" as const : "active" as const }
      : task
  );

  saveTasks(tasks);
  return tasks;
}
