import { Calendar } from "@/components/calendar/calendar";
import { CalendarHeader } from "@/components/calendar/calendar-header";

export default function Home() {
  return (
    <div>
      <CalendarHeader />
      <Calendar />
    </div>
  );
}
