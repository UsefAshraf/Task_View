import client from "./client";

export const getCategories = async () => {
    const { data } = await client.get("/categories?order=name.asc");
    return data;
};

export const getCategoryById = async (id) => {
    const {data} = await client.get(`/categories?id=eq.${id}`);
    return data[0];
}
