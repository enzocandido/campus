"use client";
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];

  const { theme } = useTheme();

  const calendarApp = useCalendarApp(
    {
      views: [viewWeek, viewMonthGrid, viewDay, viewMonthAgenda],
      defaultView: viewMonthGrid.name,
      firstDayOfWeek: 0,
      callbacks: {
        onRangeUpdate: (range) => {
          calendarApp.eventsService.set([
            {
              id: "12",
              title: "Event 1",
              start: range.start,
              end: range.end,
            },
          ]);
        },
      },
      isDark: theme == "dark",
      locale: "pt-BR",
    },
    [createDragAndDropPlugin(), createEventModalPlugin(), eventsServicePlugin],
  );

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  );
}
