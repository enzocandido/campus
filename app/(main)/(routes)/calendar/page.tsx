import { Calendar } from "@/components/calendar/calendar";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

const CalendarPage = async () => {
  const profile = await initialProfile();

  const user = await db.user.findFirst({
    where: {
      id: profile.id,
    },
    select: {
      academicRole: true,
    },
  });

  return (
    <div>
      <CalendarHeader />
      <Calendar role={user?.academicRole} />
    </div>
  );
};

export default CalendarPage;
