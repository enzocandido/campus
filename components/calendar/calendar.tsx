"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import { EventSourceInput } from "@fullcalendar/core";

interface CalendarProps {
  events: EventSourceInput;
  onDateClick: (arg: { date: Date; allDay: boolean }) => void;
  onEventClick: (arg: any) => void;
}

export function Calendar({ events, onDateClick, onEventClick }: CalendarProps) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      events={events}
      locale="pt-BR"
      buttonText={{
        today: "Hoje",
        month: "Mês",
        week: "Semana",
        day: "Dia",
        list: "Lista",
      }}
      allDayText="Dia todo"
      moreLinkText="mais"
      noEventsText="Nenhum evento"
      contentHeight={750}
      slotLabelFormat={{
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      }}
    />
  );
}
