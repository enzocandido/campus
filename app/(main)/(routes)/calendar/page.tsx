"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/calendar/calendar";
import { CalendarEventModal } from "@/components/calendar/calendar-event-modal";
import { CalendarDeleteModal } from "@/components/calendar/calendar-delete-modal";
import { Event } from "@/types";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    id: "",
    title: "",
    start: "",
    allDay: false,
  });
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/academic/tasks");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
    setNewEvent({
      ...newEvent,
      start: arg.date.toISOString(),
      allDay: arg.allDay,
      id: Date.now().toString(),
    });
    setShowEventModal(true);
  };

  const handleAddEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
    setShowEventModal(false);
  };

  const handleEventClick = (info: any) => {
    setEventToDelete(info.event.id);
    setShowDeleteModal(true);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event.id !== eventToDelete));
    setShowDeleteModal(false);
  };

  return (
    <main className="p-8">
      <Calendar
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />

      <CalendarEventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSubmit={handleAddEvent}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
      />

      <CalendarDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteEvent}
      />
    </main>
  );
}
