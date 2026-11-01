import { useState } from "react";
import Header from "./components/Header/Header.tsx";
import Main from "./components/Main/Main.tsx";
import Footer from "./components/Footer/Footer.tsx";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal.tsx";
import { addTask, readTasks, toggleTask, type Task } from "./tasks.ts";

function App() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(readTasks);
  const [storageError, setStorageError] = useState("");

  const handleToggleTask = (id: string) => {
    try {
      setTasks(toggleTask(id));
      setStorageError("");
    } catch {
      setStorageError("Could not update the task. Please try again.");
    }
  };

  return (
    <div className="container">
        <Header onAddTask={() => setIsAddTaskOpen(true)} />

        <Main tasks={tasks}
              onToggleTask={handleToggleTask}
              storageError={storageError}
        />

        <Footer />

        {isAddTaskOpen && (
          <AddTaskModal
            onClose={() => setIsAddTaskOpen(false)}
            onAddTask={(title, description) => {
              setTasks(addTask(title, description));
              setStorageError("");
            }}
          />
        )}
    </div>
  )
}

export default App
