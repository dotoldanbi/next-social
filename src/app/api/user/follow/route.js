import User from "../../../../models/User";
import { connect } from "../../../../mongoose";
import { currentUser } from "@clerk/nextjs/server";
export const POST = async (req) => {
  try {
    await connect();

    const user = await currentUser();
    const data = await req.json();

    const userProfileId = data.userProfileId;
    const userWhoFollowsId = data.userWhoFollowsId;

    if (!user || user.publicMetadata.username !== userWhoFollowsId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const userWhoFollowsFromMongoDb = await User.findById(userWhoFollowsId);

    if (!userWhoFollowsFromMongoDb) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const userProfileIdFromMongoDb = await User.findById(userProfileId);

    if (!userProfileIdFromMongoDb) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    if (
      userWhoFollowsFromMongoDb._id.toString() ===
      userProfileIdFromMongoDb._id.toString()
    ) {
      return new Response(
        JSON.stringify({ error: "You cannot follow yourself" }),
        { status: 400 },
      );
    }

    const isFollowing = userWhoFollowsFromMongoDb.following.find(
      (item) => item.toString() === userProfileIdFromMongoDb._id.toString(),
    );
    if (isFollowing) {
      userWhoFollowsFromMongoDb.following =
        userWhoFollowsFromMongoDb.following.filter(
          (item) => item.toString() !== userProfileIdFromMongoDb._id.toString(),
        );
      userProfileIdFromMongoDb.followers =
        userProfileIdFromMongoDb.followers.filter(
          (item) =>
            item.toString() !== userWhoFollowsFromMongoDb._id.toString(),
        );
    } else {
      userWhoFollowsFromMongoDb.following.push(userProfileIdFromMongoDb._id);
      userProfileIdFromMongoDb.followers.push(userWhoFollowsFromMongoDb._id);
    }

    await userWhoFollowsFromMongoDb.save();
    await userProfileIdFromMongoDb.save();

    return new Response(JSON.stringify(userWhoFollowsFromMongoDb), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
