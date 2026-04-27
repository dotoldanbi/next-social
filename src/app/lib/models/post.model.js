import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true.value,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    comments: {
      type: [
        {
          comment: { type: String },
          user: { type: mongoose.Schema.Types.ObjectId, ref: "USer" },
          name: { type: String },
          username: { type: String },
          profileImg: { type: String },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
