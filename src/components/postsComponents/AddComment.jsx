import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, Textarea } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ButtonApp from "../../shared/buttonApp/ButtonApp";

function AddComment({ post }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      reset();
      toast.success("Comment created successfully", {
        theme: "dark",
      });
      queryClient.invalidateQueries(["profille-posts", post]);
      queryClient.invalidateQueries(["all-posts", post]);
    },
    onError: () => {
      toast.error("Comment creation failed", { theme: "dark" });
    },
  });
  async function addComment(data) {
    const commentData = { ...data, post };
    return axios.post(`${import.meta.env.VITE_BASE_URL}comments`, commentData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit(mutate)} className="flex  flex-col gap-4">
        <Textarea
          {...register("content", { required: true })}
          id="comment"
          placeholder="Leave a comment..."
          rows={2}
        />

        <ButtonApp
          className="w-64 mx-auto"
          color="purple"
          isLoading={isPending}
          disabled={!isValid || isPending}
        >
          Create Comment
        </ButtonApp>
      </form>
    </>
  );
}

export default AddComment;
