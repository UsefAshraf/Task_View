import { useQuery } from "@tanstack/react-query";
import { getCategories,getCategoryById} from "../api/categories"

// export const useCategories = () => {
//     return useQuery({
//         queryKey: ["categories"],
//         queryFn: getCategories,
//     });
// };
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await getCategories();
      return Array.isArray(data) ? data : [];
    },
  });
};

export const useCategory = (id) => {
    return useQuery({
        queryKey: ["category" , id],
        queryFn: () => getCategoryById(id),
        enabled: !!id,
    });
};


