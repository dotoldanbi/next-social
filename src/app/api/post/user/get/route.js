import Post from "../../../../lib/models/post.model";
import { connect } from "../../../../lib/mongoose";

export const POST = async (req) => {
    try {
        await connect();
        const data = await req.json();
        const posts = await Post.find({ user: data.userId }).sort({ createdAt: -1 });
        return new Response(JSON.stringify(posts), {status:200});
    } catch (error) {
        return new Response(JSON.stringify({ error: "Posts not found" }), {status:404});
    }
}