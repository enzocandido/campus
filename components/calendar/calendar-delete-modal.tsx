import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface CalendarDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function CalendarDeleteModal({
  isOpen,
  onClose,
  onDelete,
}: CalendarDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Evento</DialogTitle>
        </DialogHeader>
        <p className="font-light">
          Tem certeza que deseja deletar este evento?
        </p>
        <div className="flex justify-end space-x-2">
          <Button
            variant="destructive"
            className="px-4 py-2"
            onClick={onDelete}
          >
            Deletar
          </Button>
          <Button variant="secondary" className="px-4 py-2" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
