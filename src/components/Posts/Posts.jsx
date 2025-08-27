import React from "react";
import PostsList from "../postsComponents/PostsList";
import Add from "../postsComponents/Add";
import { Helmet } from "react-helmet";
function Posts() {
  return (
    <>
      <Helmet>
        <title>Kudo | Home</title>
      </Helmet>
      <Add />
      <PostsList />
    </>
  );
}

export default Posts;
