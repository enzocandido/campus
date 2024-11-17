import { currentUser, auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const initialProfile = async () => {
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

  const newProfile = await db.user.create({
    data: {
      id: user.id,
      name: (user.lastName ? `${user.firstName} ${user.lastName}` : `${user.firstName}`),
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
