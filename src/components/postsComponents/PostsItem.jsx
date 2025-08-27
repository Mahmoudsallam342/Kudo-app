import { Avatar, Card } from "flowbite-react";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import CommentPostHeader from "./CommentPostHeader";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";
import CardHeader from "./CardHeader";

function PostsItem({ post, showAllComments = false }) {
  const { body, image, createdAt, user, comments, _id } = post;
  return (
    <>
      <Card>
        {/* ===========header========== */}
        <CardHeader
          user={{ ...user, createdAt }}
          mediaId={_id}
          isComment={false}
        />

        {/* ==============content=============== */}
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {body}
        </h3>
        {image && (
          <img className="h-96 object-contain" src={image} alt={body} />
        )}

        {/* =================foooter============= */}
        <footer className="flex justify-between items-center">
          <AiFillLike />
          <div className="flex gap-4 items-center">
            <FaComment />
            {comments && comments.length}
          </div>
          <Link to={`/posts/${_id}`}>
            <FaShare />
          </Link>
        </footer>
        {/* ===================comments================== */}
        {comments &&
          comments.length > 0 &&
          (showAllComments ? (
            <>
              {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
              ))}
            </>
          ) : (
            <>
              <CommentItem comment={comments[comments.length - 1]} />
            </>
          ))}
        <AddComment post={_id} />
      </Card>
    </>
  );
}

export default PostsItem;
