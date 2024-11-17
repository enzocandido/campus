import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/lib/users";
import { User, AcademicRole } from "@prisma/client";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id || !email_addresses) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const user = {
      id,
      clerkUserId: id,
      email: email_addresses[0].email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      imageUrl: image_url || "",
      role: "user",
      academicRole: AcademicRole.STUDENT,
      ra: null,
      course: null,
      university: null,
      department: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await createUser(user as User);
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id || !email_addresses) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const updatedUser = {
      email: email_addresses[0].email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      imageUrl: image_url || "",
    };

    await db.user.update({
      where: { id },
      data: updatedUser,
    });
  }

  return new Response("", { status: 200 });
}
