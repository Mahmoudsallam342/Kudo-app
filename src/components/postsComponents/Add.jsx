import axios from "axios";
import { Button, Card, Label, Textarea } from "flowbite-react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { IoCloudUploadSharp } from "react-icons/io5";
import ButtonApp from "../../shared/buttonApp/ButtonApp";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Add() {
  const fileInputRef = useRef();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      reset();
      toast.success("Post created successfully", {
        theme: "dark",
      });
      queryClient.invalidateQueries(["profile-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
    },
    onError: () => {
      toast.error("Post creation failed", { theme: "dark" });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();
  async function addPost(data) {
    console.log(data.body, fileInputRef.current.files[0]);

    const formData = new FormData();
    formData.append("body", data.body);
    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    return await axios.post(`${import.meta.env.VITE_BASE_URL}posts`, formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  return (
    <>
      <section className="py-6">
        <div className="max-w-3xl mx-auto ">
          <Card>
            <form
              onSubmit={handleSubmit(mutate)}
              className="flex max-w-md flex-col gap-4"
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="comment">
                    <h2 className="text-3xl p-2"> Post here</h2>
                  </Label>
                </div>
                <div className="flex items-center w-2xl gap-6">
                  <Textarea
                    {...register("body")}
                    id="comment"
                    placeholder="Leave a comment..."
                    rows={2}
                  />
                  <input
                    {...register("image")}
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                  />
                  <IoCloudUploadSharp
                    onClick={() => fileInputRef.current.click()}
                    className="text-3xl cursor-pointer"
                  />
                </div>
              </div>

              <ButtonApp
                className="ms-0 w-64"
                color="purple"
                isLoading={isPending}
                disabled={!isValid || isPending}
              >
                Create Comment
              </ButtonApp>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Add;
