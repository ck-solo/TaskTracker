import React, { useState } from "react";

function Center({ addTask, tasks, isDark }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [errors, setErrors] = useState({
    title: "",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { title: "", description: "" };
    if (!title.trim()) {
      newErrors.title = "Please enter a task title.";
    }
    if (!description.trim()) {
      newErrors.description = "Please enter task description.";
    }
    if (newErrors.title || newErrors.description) {
      setErrors(newErrors);
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      level: priority,
      completed: false,
      running: false,
      time: 0
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setPriority("Low");
    setErrors({ title: "", description: "" });
  };
  const active = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;

  return (
    <div className={`px-6 py-4 rounded-2xl shadow-xl mt-6 ${
      isDark
        ? "bg-gray-800 border border-gray-700 text-white"
        : "bg-white border border-gray-100 text-black"
    }`}>
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <div className="flex gap-2 mb-6 text-sm font-semibold">
        <span className={`${isDark ? "bg-gray-700" : "bg-gray-100"} px-3 py-1 rounded-lg`}>
          All: {tasks.length}
        </span>
        <span className="px-3 py-1 bg-blue-500 text-white rounded-lg">
          Active: {active}
        </span>
        <span className="px-3 py-1 bg-green-500 text-white rounded-lg">
          Done: {completed}
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border rounded-xl px-4 py-3 shadow-inner outline-none ${
            isDark
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-50 border-gray-200"
          }`}
        />
        <textarea
          rows="4"
          placeholder="Enter your task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`border rounded-xl px-4 py-3 shadow-inner resize-none outline-none ${
            isDark
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-50 border-gray-200"
          }`}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`border rounded-xl px-4 py-3 ${
            isDark
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        <button className="w-fit px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl">
          Add Task
        </button>

      </form>
    </div>
  );
}

export default Center;
