import client from "./client";

export const getAllTasks = async (page=1,limit=10) => {
    const offset = (page - 1) * limit;
    const url = `/tasks?limit=${limit}&offset=${offset}&order=created_at.desc`;
    const { data } = await client.get(url);
    return data;
};

export const getTasksByCategory = async ( categoryId , page=1,limit=10) => {
    const offset = (page - 1) * limit;
    const url = `/tasks?category_id=eq.${categoryId}&limit=${limit}&offset=${offset}&order=created_at.desc`;

    const { data } = await client.get(url);
    return data;
}
export const getTaskById = async (id) => {
    const {data} = await client.get(`/tasks?id=eq.${id}`);
    return data[0];
};

export const createTask = async (task) => {
    const { data } = await client.post("/task" , task);
    return data[0];
}

export const updateTask = async (id,updates)=> {
    const {data} = await client.patch(`/tasks?id=eq.${id}`, updates);
    return data[0];
}

// Delete task
export const deleteTask = async (id) => {
  await client.delete(`/tasks?id=eq.${id}`);
  return id;
};

