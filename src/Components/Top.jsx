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

  const box = `flex flex-col items-center justify-center py-4 rounded-2xl shadow-md ${
    isDark
      ? "bg-gray-800 border border-gray-700 text-white"
      : "bg-white border border-gray-200 text-black"
  }`;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className={box}>
        <p className="font-bold text-lg">{total}</p>
        <p>Total</p>
      </div>

      <div className={box}>
        <p className="font-bold text-lg">{active}</p>
        <p>Active</p>
      </div>

      <div className={box}>
        <p className="font-bold text-lg">{completed}</p>
        <p>Done</p>
      </div>

      <div className={box}>
        <p className="font-bold text-sm sm:text-base">
          {formatTime(totalTimeSeconds)}
        </p>
        <p>Total Time</p>
      </div>

      <div className={box}>
        <p className="font-bold text-sm sm:text-base">
          {formatTime(avgSeconds)}
        </p>
        <p>Avg</p>
      </div>

      <div className={box}>
        <p className="font-bold text-lg">{progress}%</p>
        <p>Progress</p>
      </div>
    </div>
  );
}

export default Top;
