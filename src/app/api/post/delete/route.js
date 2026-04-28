import Post from "@/app/lib/models/post.model";
import { connect } from "@/app/lib/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export const DELETE = async (req) => {
  const user = await currentUser();

  try {
    await connect();
    const data = await req.json();

    if (!user) {
      return new Response({ status: 401, body: "Unauthorized" });
    }

    const post = await Post.findByIdAndDelete(data.postId);
    return new Response("Post Deleted", { status: 200 });
  } catch (error) {
    console.log("Error deleting post");
    return new Response("Error deleting post", { status: 500 });
  }
};
