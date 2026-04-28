import Post from "@/app/lib/models/post.model";

import { connect } from "@/app/lib/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export const PUT = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();

    if (!user) {
      return { status: 401, body: "Unauthorized" };
    }

    const post = await Post.findById(data.postId);
    if (post.likes.includes(user.publicMetadata.userMongoId)) {
      const updatePost = await Post.findByIdAndUpdate(
        data.postId,
        { $pull: { likes: user.publicMetadata.userMongoId } },
        { new: true },
      );
      return new Response(JSON.stringify(updatePost), { status: 200 });
    } else {
      const updatePost = await Post.findByIdAndUpdate(
        data.postId,
        { $addToSet: { likes: user.publicMetadata.userMongoId } },
        { new: true },
      );
      return new Response(JSON.stringify(updatePost), { status: 200 });
    }
  } catch (error) {
    console.log("Error linking post", error);
    return new Response("Error linking post", { status: 500 });
  }
};
