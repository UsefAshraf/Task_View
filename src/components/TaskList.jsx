import React, { useState, useEffect } from "react";
import { Filter, CheckCircle2 } from "lucide-react";
import { useTasks, useTaskByCategory, useUpdateTask } from "../hooks/useTasks";
import { useCategories } from "../hooks/useCategories";
import Navbar from "./Navbar";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    setPage(1);
  }, [categoryId]);

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = categoryId ? useTaskByCategory(categoryId, page, 9) : useTasks(page, 9);

  const { data: categories } = useCategories();
  const updateTask = useUpdateTask();

  const getCategory = (id) => categories?.find((c) => c.id === id);

  const handleToggle = (task) => {
    setUpdatingId(task.id);
    updateTask.mutate(
      { id: task.id, updates: { completed: !task.completed } },
      { onSettled: () => setUpdatingId(null) }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar taskCount={tasks?.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Filter Tasks
            </h2>
            <div className="relative">
              <select
                value={categoryId || ""}
                onChange={(e) =>
                  setCategoryId(e.target.value ? Number(e.target.value) : null)
                }
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
              >
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {tasks?.length ? (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  category={getCategory(task.category_id)}
                  updatingId={updatingId}
                  handleToggle={handleToggle}
                />
              ))}
            </div>

            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white 
               border border-gray-300 rounded-lg 
               hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed 
               transition-colors shadow-sm"
                disabled={page === 1}
              >
                ← Previous
              </button>

              <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm">
                Page {page}
              </div>

              <button
                onClick={() => setPage((p) => p + 1)}
                className="flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white 
               border border-gray-300 rounded-lg 
               hover:bg-gray-200 transition-colors shadow-sm"
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-sm border p-12">
              <CheckCircle2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-500">
                There are no tasks to display at the moment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
