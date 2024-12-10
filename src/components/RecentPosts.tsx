import Post from "@/lib/models/post.model";
import React from "react";
import PostCard from "./PostCard";

interface Post {
  _id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
}

const RecentPosts = async ({ limit }: { limit: number }) => {
  let posts = null;
  try {
    const result = await fetch(process.env.URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ limit: 3, order: "desc" }),
      cache: "no-store",
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log("Error getting posts", error);
  }
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-xl mt-5">Recent articles</h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {posts &&
          posts.map((post: Post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default RecentPosts;
