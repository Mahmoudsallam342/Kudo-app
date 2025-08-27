import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetch(queryKey, endPoint) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKey,
    queryFn: getPosts,
    select: (data) => data.data,
  });
  async function getPosts() {
    return await axios.get(`${import.meta.env.VITE_BASE_URL}${endPoint}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  return { data, isLoading, isError, error };
}
