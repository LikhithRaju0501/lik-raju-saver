import axios from "axios";
import { useQuery, useMutation } from "react-query";

const fetchTasks = () => axios.get("http://localhost:5000/");

export const useGetTasks = (onSuccess, onError) => {
  return useQuery("all-tasks", fetchTasks, {
    onSuccess,
    onError,
  });
};

const addTask = (task) => axios.post("http://localhost:5000/", task);

export const usePostTasks = (onSuccess, onError) => {
  return useMutation(addTask, {
    onSuccess,
    onError,
  });
};
