import React, { useContext } from "react";
import { formateDate } from "../../lib/formateDate";

import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../authContext/AuthContext";

export default function CardHeader({
  user: { name, photo, createdAt, _id },
  mediaId,
  isComment,
  setIsEditing,
}) {
  const { userData } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { mutate: handleDeletePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success(isComment ? "Comment deleted" : "Post deleted", {
        theme: "dark",
      });
      queryClient.invalidateQueries(["profile-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
    },
    onError: () => {
      toast.error(isComment ? "Comment delete failed" : "Post delete failed", {
        theme: "dark",
      });
    },
  });
  async function deletePost() {
    const endPoint = isComment ? "comments" : "posts";
    return await axios.delete(
      `${import.meta.env.VITE_BASE_URL}${endPoint}/${mediaId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  return (
    <header className="flex items-center">
      <div className="flex items-center">
        <picture>
          <Avatar
            alt={name}
            img={
              !photo.includes("undefined")
                ? photo
                : `${import.meta.env.VITE_BASE_URL}uploads/default-profile.png`
            }
            rounded
            className="me-4"
          />
        </picture>
        <div>
          <h2 className="text-lg mb-0 font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h2>
          <span>{formateDate(createdAt)}</span>
        </div>
      </div>
      {userData?._id === _id && (
        <Dropdown inline label="">
          <DropdownItem onClick={() => setIsEditing(true)}>Edit</DropdownItem>
          <DropdownItem onClick={handleDeletePost}>Delete</DropdownItem>
        </Dropdown>
      )}
    </header>
  );
}
