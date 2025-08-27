import { useParams } from "react-router-dom";
import PostsItem from "../postsComponents/PostsItem";
import { useFetch } from "../../hooks/useFetch";

function PostDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetch(
    ["details-posts", id],
    `posts/${id}`
  );

  return (
    <>
      <section className="py-12">
        <div className="max-w-3xl mx-auto ">
          <div className="flex flex-col gap-6">
            {isLoading && (
              <div className="text-center text-4xl"> loading....</div>
            )}
            {isError && (
              <div className="text-center text-4xl text-red-700">{error}</div>
            )}
            {data && <PostsItem post={data.post} showAllComments={true} />}
          </div>
        </div>
      </section>
    </>
  );
}

export default PostDetails;
