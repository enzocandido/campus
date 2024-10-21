import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
// import { HomeWarnings } from "./home-warnings";
import { HomeProfileCard } from "./home-profile-card";

export const HomeGrid = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  return (
    <div className="flex-row md:flex md:w-full h-full justify-center items-center p-8 md:gap-10">
      {/* <HomeWarnings /> */}
      <HomeProfileCard
        name={profile.name}
        ra={profile.ra || ""}
        email={profile.email}
        imageUrl={profile.imageUrl}
        university={profile.university || "Não informado."}
        course={profile.course || "Não informado."}
      />
    </div>
  );
};
