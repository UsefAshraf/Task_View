// src/components/TaskCard.jsx
import { CheckCircle2, Circle, Tag } from "lucide-react";

const TaskCard = ({ task, category, updatingId, handleToggle }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-500 bg-red-50 border-red-200";
      case "medium": return "text-amber-600 bg-amber-50 border-amber-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div
      key={task.id}
      className={`group relative rounded-xl shadow-sm border bg-white overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={task.image_url}
          alt={task.title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image")
          }
        />
        {task.completed && (
          <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 bg-white rounded-full p-2" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3
            className={`text-lg font-semibold leading-tight ${
              task.completed
                ? "line-through text-gray-500"
                : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {category && (
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: category.color }}
            >
              <Tag className="w-3 h-3 mr-1" />
              {category.name}
            </span>
          )}
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority
              ? task.priority.charAt(0).toUpperCase() +
                task.priority.slice(1)
              : "N/A"}{" "}
            Priority
          </span>
        </div>

        <button
          onClick={() => handleToggle(task)}
          className={`w-full cursor-pointer flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            task.completed
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={updatingId === task.id}
        >
          {updatingId === task.id ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
              Updating...
            </>
          ) : task.completed ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Completed
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 mr-2" />
              Mark Complete
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
