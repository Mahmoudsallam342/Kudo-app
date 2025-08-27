import PostsItem from "./PostsItem";
import { CgEnter } from "react-icons/cg";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import Skeleton from "react-loading-skeleton";

function PostsList({ isHome = true }) {
  const { userData } = useContext(AuthContext);
  const queryKey = isHome ? ["all-posts"] : ["user-posts"];
  const apiUrl = isHome
    ? `posts?limit=10&sort=-createdAt`
    : `users/${userData?._id}/posts`;
  const { data, isLoading, isError, error } = useFetch(
    queryKey,
    apiUrl,
    userData
  );

  return (
    <>
      <section className="py-12">
        <div className="max-w-3xl mx-auto ">
          <div className="flex flex-col gap-6">
            {isLoading && (
              <Skeleton
                className="h-96 mb-4"
                baseColor="#1E2939"
                highlightColor="#101828"
                count={5}
              />
            )}
            {isError && (
              <div className="text-center text-4xl text-red-700">{error}</div>
            )}
            {data &&
              data.posts.map((post) => <PostsItem key={post.id} post={post} />)}
          </div>
        </div>
      </section>
    </>
  );
}

export default PostsList;
