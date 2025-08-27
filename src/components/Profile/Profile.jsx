import React from "react";
import PostsList from "../postsComponents/PostsList";
import Add from "../postsComponents/Add";
import ProfileCard from "./ProfileCard";
import { Helmet } from "react-helmet";
function Profile() {
  return (
    <>
      <Helmet>
        <title>Kudo | Profile</title>
      </Helmet>
      <Add />
      <ProfileCard />
      <PostsList isHome={false} />
    </>
  );
}

export default Profile;
