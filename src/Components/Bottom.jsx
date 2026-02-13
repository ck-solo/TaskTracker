import React, { useState, useRef } from "react";

function Bottom({ tasks, setTasks, isDark }) {
  const [searchText, setSearchText] = useState("");
  const timerRef = useRef(null);
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const showMinutes = String(minutes).padStart(2, "0");
    const showSeconds = String(remainingSeconds).padStart(2, "0");
    return showMinutes + ":" + showSeconds + "s";
  }

  const filteredTasks = tasks.filter(function (task) {
    const title = task.title.toLowerCase();
    const search = searchText.toLowerCase();
    return title.includes(search);
  });

  function startGlobalTimer() {
    if (timerRef.current !== null) {
      return;
    }
    timerRef.current = setInterval(function () {
      let updatedTasks = tasks.map(function (task) {
        if (task.running === true && task.completed === false) {
          return {
            ...task,
            time: task.time + 1
          };
        }
        return task;
      });

      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }, 1000);
  }

  function stopGlobalTimer() {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function startTask(selectedTask) {
    if (selectedTask.completed === true) return;
    let updatedTasks = tasks.map(function (task) {
      if (task.id === selectedTask.id) {
        return { ...task, running: true };
      }
      return { ...task, running: false };
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    startGlobalTimer();
  }

  function pauseTask(selectedTask) {
    let updatedTasks = tasks.map(function (task) {
      if (task.id === selectedTask.id) {
        return { ...task, running: false };
      }
      return task;
    });

    const runningTaskExists = updatedTasks.some(function (task) {
      return task.running === true && task.completed === false;
    });
    if (!runningTaskExists) {
      stopGlobalTimer();
    }
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function completeTask(selectedTask) {
    let updatedTasks = tasks.map(function (task) {
      if (task.id === selectedTask.id) {
        return {
          ...task,
          completed: !task.completed,
          running: false
        };
      }
      return task;
    });

    stopGlobalTimer();
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function deleteTask(taskId) {
    const updatedTasks = tasks.filter(function (task) {
      return task.id !== taskId;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
 
  function getLevelColor(level) {
    if (!level) return "border-gray-300";
    if (level === "Low") return "border-green-500";
    if (level === "Medium") return "border-yellow-500";
    if (level === "High") return "border-red-500";
    return "border-gray-300";
  }
 
  return (
    <div className={`p-6 rounded-2xl shadow-xl ${
      isDark
        ? "bg-gray-800 border border-gray-700 text-white"
        : "bg-white border border-gray-200 text-black"
    }`}>
 
      <input
        placeholder="Search task..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full mb-5 px-4 py-3 rounded-xl"
      />

      {filteredTasks.map(function (task) {
        return (
          <div
            key={task.id}
            className={`p-4 mb-4 rounded-xl border-l-4 ${getLevelColor(task.level)}
            ${isDark ? "bg-gray-700" : "bg-gray-50"}`}
          > 
            <div className="flex justify-between">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => completeTask(task)}
                />
                <h3 className={task.completed ? "line-through" : ""}>
                  {task.title}
                </h3>
              </div>
              <button onClick={() => deleteTask(task.id)}>
                🗑
              </button>
            </div> 
            <p className="text-sm mt-1">{task.description}</p>
            <div className="flex justify-between mt-3">
              <span>⏱ {formatTime(task.time)}</span>
              <div className="flex gap-2">
                <button onClick={() => startTask(task)}>▶</button>
                <button onClick={() => pauseTask(task)}>❚❚</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Bottom;
