// src/hooks/useTasks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTasks,
  getTasksByCategory,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasks";

export const useTasks = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["tasks", "all", page, limit],
    queryFn: async () => {
      const data = await getAllTasks(page, limit);
      return Array.isArray(data) ? data : []; 
    },
  });
};

export const useTaskByCategory = (categoryId, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["tasks", "category", categoryId, page, limit],
    queryFn: async () => {
      if (!categoryId) return [];
      const data = await getTasksByCategory(categoryId, page, limit);
      return Array.isArray(data) ? data : []; 
    },
    enabled: !!categoryId,
  });
};
export const useTask = (id) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
