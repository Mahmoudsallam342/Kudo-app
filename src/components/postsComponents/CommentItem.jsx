import { Card, Textarea } from "flowbite-react";
import React, { useState } from "react";
import CardHeader from "./CardHeader";
import ButtonApp from "../../shared/buttonApp/ButtonApp";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function CommentItem({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { mutate: handleUptadeComment } = useMutation({
    mutationFn: uptadeComment,
    onSuccess: () => {
      toast.success("Comment uptaded", {
        theme: "dark",
      });
      setIsEditing(false);
      queryClient.invalidateQueries(["profile-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
    },
    onError: () => {
      toast.error("Comment uptaded failed", {
        theme: "dark",
      });
    },
  });
  async function uptadeComment(data) {
    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}comments/${comment._id}`,
      data,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  return (
    <Card>
      <CardHeader
        user={{ ...comment.commentCreator, createdAt: comment.createdAt }}
        mediaId={comment._id}
        isComment={true}
        setIsEditing={setIsEditing}
      />
      {isEditing ? (
        <form onSubmit={handleSubmit(handleUptadeComment)}>
          <Textarea
            className="mb-4"
            defaultValue={comment.content}
            {...register("content")}
          />
          <div className="flex gap-2">
            <ButtonApp type="submit">Uptade</ButtonApp>
            <ButtonApp
              type="reset"
              color="alternate"
              onclick={() => setIsEditing(false)}
            >
              Cancel
            </ButtonApp>
          </div>
        </form>
      ) : (
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {comment.content}
        </h3>
      )}
    </Card>
  );
}

export default CommentItem;
