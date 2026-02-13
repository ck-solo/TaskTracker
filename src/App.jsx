import React, { useState, useRef, useEffect } from "react";
import Top from "./Components/Top";
import Center from "./Components/Center";
import Bottom from "./Components/Bottom";

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    if (!saved || saved === "undefined") return [];
    return JSON.parse(saved);
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // ✅ RENDER COUNTER (updates on EVERY re-render)
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  const updateTask = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const addTask = (task) => {
    updateTask([...tasks, task]);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex justify-center py-10 transition-all duration-300 ${
        isDark
          ? "bg-gray-900 text-white"
          : "bg-linear-to-br from-gray-100 to-gray-200 text-black"
      }`}
    >
      <div className="w-full lg:w-3/5 space-y-6">
       <div
          className={`rounded-2xl shadow-lg px-4 py-4 flex justify-between items-center ${
            isDark
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        > 
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">🗂 Task Manager</h2>


          </div>

          <div
            onClick={toggleTheme}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xl">
              {isDark ? "☀️" : "🌙"}
            </span>
            <span className="hidden sm:block">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
              <span className="px-3 py-1 rounded-full bg-purple-500 text-white text-sm">
              Render: {renderCount.current}
            </span>
          </div>
        </div>

        <Top tasks={tasks} isDark={isDark} />
        <Center addTask={addTask} tasks={tasks} isDark={isDark} />
        <Bottom tasks={tasks} setTasks={updateTask} isDark={isDark} />

      </div>
    </div>
  );
}

export default App;
