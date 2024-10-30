import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Event } from "@/types";
import { Button } from "../ui/button";
import { currentProfile } from "@/lib/current-profile";

interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Event) => void;
  newEvent: Event;
  setNewEvent: (event: Event) => void;
}

export function CalendarEventModal({
  isOpen,
  onClose,
  onSubmit,
  newEvent,
  setNewEvent,
}: CalendarEventModalProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, title: e.target.value });
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewEvent({ ...newEvent, content: e.target.value });
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newEvent);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Evento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={newEvent.title}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 mt-4"
          />
          <textarea
            placeholder="Conteúdo"
            value={newEvent.content}
            onChange={handleChangeContent}
            className="w-full rounded-md border px-3 py-2 mt-4 h-24"
          />
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={!newEvent.title}
          >
            Criar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
