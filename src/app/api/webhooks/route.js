import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { createOrUpdateUser, deleteUser } from "@/app/lib/actions/user";
export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data;
    const eventType = evt?.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created" || eventType === "user.updated") {
      console.log("User created event");
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username,
      } = evt?.data;
      try {
        createOrUpdateUser(
          id,
          first_name,
          last_name,
          image_url,
          email_addresses,
          username,
        );
      } catch (error) {
        console.log("error creating user");
      }
    }

    if (eventType === "user.deleted") {
      console.log("User deleted event");
      try {
        deleteUser(id);
      } catch (error) {
        console.log("error deleting user");
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
