import connect from "../../../../lib/mongoose";
import Post from "../../../../lib/models/post.model";

export const POST = async (req) => {
    const data = await req.json();
    const searchTerm = decodeURIComponent(data.searchTerm);
  try {
    await connect();

    const searchResults = await Post.find({
        $or : [
            { username: { $regex: searchTerm, $options:'i'}},
            { name: { $regex: searchTerm, $options:'i'}},
            { text: { $regex: searchTerm, $options:'i'}},
        ],
    }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(searchResults), { status: 200 });

  } catch (error) {
    console.log("Error connecting to database");
    return new Response("Error connecting to database", { status: 500 });
  }
};
