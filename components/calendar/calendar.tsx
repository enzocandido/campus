"use client";

import { createCalendar, viewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { ScheduleXCalendar } from "@schedule-x/react";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface CalendarProps {
  role?: string;
}

export const Calendar = ({ role }: CalendarProps) => {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
  const { theme } = useTheme();

  const [eventToDelete, setEventToDelete] = useState<any | null>(null);
  const router = useRouter();

  const adjustTimezone = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() - 3);
    return date.toISOString();
  };

  const fetchTasksAndEvents = async () => {
    try {
      const tasksRes = await fetch("/api/academic/tasks");
      const tasksData = await tasksRes.json();
      if (!tasksRes.ok) {
        console.error("Erro ao buscar tarefas:", tasksData.error);
        return;
      }

      const eventsRes = await fetch("/api/academic/events");
      const eventsData = await eventsRes.json();
      if (!eventsRes.ok) {
        console.error("Erro ao buscar eventos:", eventsData.error);
        return;
      }

      const tasks = tasksData.map((task: any) => {
        const eventDate = new Date(task.dueDate);

        return {
          id: task.id,
          title: task.title,
          description: task.description,
          people: [task.professor?.name || "Desconhecido"],
          start: adjustTimezone(eventDate.toISOString()),
          end: adjustTimezone(eventDate.toISOString()),
          isEvent: false,
        };
      });

      const events = eventsData.map((event: any) => {
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          location: event.location,
          start: adjustTimezone(new Date(event.startDate).toISOString()),
          end: adjustTimezone(new Date(event.endDate).toISOString()),
          isEvent: true,
        };
      });

      const combined = [...tasks, ...events];
      calendarApp.eventsService.set(combined);
    } catch (error) {
      console.error("Erro ao carregar tarefas e eventos:", error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/academic/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o evento.");
      }

      toast({
        title: "Sucesso",
        description: "Evento deletado com sucesso!",
      });

      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar o evento:", error);
      toast({ title: "Erro", description: "Falha ao deletar o evento." });
    }
  };

  const calendarApp = createCalendar(
    {
      views: [viewMonthGrid],
      defaultView: viewMonthGrid.name,
      firstDayOfWeek: 0,
      isDark: theme === "dark",
      locale: "pt-BR",
      callbacks: {
        onDoubleClickEvent(calendarEvent) {
          if (role === "ADMIN") {
            if (calendarEvent.isEvent) {
              setEventToDelete(calendarEvent);
            } else {
              toast({
                title: "Aviso",
                description: "Apenas eventos podem ser deletados.",
              });
            }
          }
        },
      },
    },
    [createDragAndDropPlugin(), createEventModalPlugin(), eventsServicePlugin],
  );

  useEffect(() => {
    fetchTasksAndEvents();
  }, []);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendarApp} />

      <AlertDialog
        open={!!eventToDelete}
        onOpenChange={() => setEventToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              evento {eventToDelete?.title}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex space-y-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                eventToDelete && handleDeleteEvent(String(eventToDelete.id))
              }
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
