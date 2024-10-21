"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core";

interface CalendarProps {
  events: EventSourceInput;
  onDateClick: (arg: { date: Date; allDay: boolean }) => void;
  onEventClick: (arg: any) => void;
}

export function Calendar({ events, onDateClick, onEventClick }: CalendarProps) {
  return (
    <FullCalendar
      locale={"pt-BR"}
      timeZone="local"
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek",
      }}
      events={events}
      nowIndicator={true}
      editable={true}
      selectable={true}
      dateClick={onDateClick}
      eventClick={onEventClick}
      buttonText={{
        today: "Hoje",
        month: "Mês",
        week: "Semana",
        day: "Dia",
        list: "Lista",
      }}
      contentHeight={750}
      slotLabelFormat={{
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      }}
    />
  );
}
