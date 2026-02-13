import React, { useState, useRef } from "react";

function Bottom({ tasks, setTasks, isDark }) {

  const [search, setSearch] = useState("");
  const intervalRef = useRef(null);
 
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formattedMinutes = String(mins).padStart(2, "0");
    const formattedSeconds = String(secs).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}s`;
  }
 
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );
 
  function startGlobalTimer() {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTasks((previousTasks) => {

        const updated = previousTasks.map((task) => {
          if (task.running && !task.completed) {
            return { ...task, time: task.time + 1 };
          }
          return task;
        });

        localStorage.setItem("tasks", JSON.stringify(updated));
        return updated;
      });
    }, 1000);
  }

  function stopGlobalTimer() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
 
  function startTask(task) {
    if (task.completed) return;

    setTasks((previousTasks) => {

      const updatedTasks = previousTasks.map((t) =>
        t.id === task.id
          ? { ...t, running: true }
          : { ...t, running: false }
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      startGlobalTimer();

      return updatedTasks;
    });
  }

  function pauseTask(task) {
    setTasks((previousTasks) => {

      const updatedTasks = previousTasks.map((t) =>
        t.id === task.id ? { ...t, running: false } : t
      );

      const anyRunning = updatedTasks.some(
        (t) => t.running && !t.completed
      );

      if (!anyRunning) stopGlobalTimer();

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  function completeTask(task) {
    setTasks((previousTasks) => {

      const updatedTasks = previousTasks.map((t) =>
        t.id === task.id
          ? { ...t, completed: !t.completed, running: false }
          : t
      );

      const anyRunning = updatedTasks.some(
        (t) => t.running && !t.completed
      );

      if (!anyRunning) stopGlobalTimer();

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  function deleteTask(taskId) {
    setTasks((previousTasks) => {

      const updatedTasks = previousTasks.filter(
        (t) => t.id !== taskId
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

   
  function getLevelColor(level) {
    if (!level) return "border-gray-300";

    const value = level.toLowerCase();

    if (value === "low") return "border-green-500";
    if (value === "medium") return "border-yellow-500";
    if (value === "high") return "border-red-500";

    return "border-gray-300";
  }

  return (
    <div className={`p-6 rounded-2xl shadow-xl ${
      isDark
        ? "bg-gray-800 border border-gray-700 text-white"
        : "bg-white border border-gray-200 text-black"
    }`}>
      <input
        placeholder="🔍 Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full mb-5 px-4 py-3 rounded-xl outline-none ${
          isDark
            ? "bg-gray-700 border border-gray-600"
            : "bg-gray-50 border border-gray-200"
        }`}
      />     
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 mb-4 rounded-xl border-l-4 ${getLevelColor(task.level)}
          ${isDark ? "bg-gray-700" : "bg-gray-50"}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(task)}
              />
              <h3 className={`font-bold ${
                task.completed && "line-through text-gray-400"
              }`}>
                {task.title}
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold
                ${
                  task.level === "Low"
                    ? "bg-green-100 text-green-700"
                    : task.level === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}>
                {task.level}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 text-lg"
            >
              🗑
            </button>
          </div>

          <p className="mt-1 text-sm opacity-80">
            {task.description}
          </p>
          <div className="flex justify-between items-center mt-3">
            
            <span>⏱ {formatTime(task.time)}</span>

            <div className="flex gap-2">
              <button
                onClick={() => startTask(task)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                ▶
              </button>

              <button
                onClick={() => pauseTask(task)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                ❚❚
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bottom;
