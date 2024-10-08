import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return auth().redirectToSignIn();
    }

    const profile = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (profile) {
      return profile;
    }

    const fullName =
      (user.firstName || "") + (user.lastName ? ` ${user.lastName}` : "");

    const newProfile = await db.user.create({
      data: {
        id: user.id,
        name: fullName || "Unknown",
        imageUrl: user.imageUrl || "",
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newProfile;
  } catch (error) {
    console.error("Error creating or retrieving the user profile:", error);
    throw new Error("Failed to create or retrieve user profile");
  }
};
