import Post from "@/app/lib/models/post.model";
import { connect } from "@/app/lib/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();

    if (!user) {
      return new Response({ status: 401, body: "Unauthorized" });
    }

    const post = await Post.findById(data.postId);
    if (!post) {
      return new Response({ status: 404, body: "Post not found" });
    }

    return new Response(JSON.stringify(post), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.log("Error fetching post data");
    return new Response("Error fetching post data", { status: 500 });
  }
};  

