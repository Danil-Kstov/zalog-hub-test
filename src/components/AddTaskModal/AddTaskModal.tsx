import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

type AddTaskModalProps = {
  onClose: () => void;
  onAddTask: (title: string, description: string) => void;
};

const AddTaskModal = ({ onClose, onAddTask }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Enter a task title.");
      return;
    }

    try {
      onAddTask(trimmedTitle, description.trim());
      onClose();
    } catch {
      setError("Could not save the task. Please try again.");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-heading"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="add-task-heading" className="text-xl font-bold text-slate-900">
            Add task
          </h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xl leading-none text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task-title" className="mb-1 block font-medium text-slate-800">
              Title
            </label>
            <input
              id="task-title"
              autoFocus
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (error) setError("");
              }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="What needs to be done?"
            />
          </div>

          <div>
            <label htmlFor="task-description" className="mb-1 block font-medium text-slate-800">
              Description <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Add some details"
            />
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Add task
            </button>
          </div>
        </form>
      </section>
    </div>,
    document.body,
  );
};

export default AddTaskModal;
