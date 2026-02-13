import React from "react";

function Top({ tasks, isDark }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;
  const totalTimeSeconds = tasks.reduce((sum, task) => {
    return sum + task.time;
  }, 0);
  const avgSeconds = total > 0 ? Math.floor(totalTimeSeconds / total) : 0;
  const progress = total > 0 ? Math.floor((completed / total) * 100) : 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formattedMins = String(mins).padStart(2, "0");
    const formattedSecs = String(secs).padStart(2, "0");

    return `${formattedMins}:${formattedSecs}s`;
  };

  const box = `flex flex-col items-center justify-center w-32 h-24 rounded-2xl shadow-md ${
    isDark
      ? "bg-gray-800 border border-gray-700 text-white"
      : "bg-white border border-gray-200 text-black"
  }`;

  return (
    <div className="flex flex-wrap gap-6">
      <div className={box}>
        <p className="font-bold">{total}</p>
        <p>Total</p>
      </div>

      <div className={box}>
        <p className="font-bold">{active}</p>
        <p>Active</p>
      </div>

      <div className={box}>
        <p className="font-bold">{completed}</p>
        <p>Done</p>
      </div>

      <div className={box}>
        <p className="font-bold">{formatTime(totalTimeSeconds)}</p>
        <p>Total Time</p>
      </div>

      <div className={box}>
        <p className="font-bold">{formatTime(avgSeconds)}</p>
        <p>Avg</p>
      </div>

      <div className={box}>
        <p className="font-bold">{progress}%</p>
        <p>Progress</p>
      </div>
    </div>
  );
}

export default Top;
