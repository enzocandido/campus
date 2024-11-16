"use client";

import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

export const AdminEvent = () => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="default"
        size="sm"
        className="inline-flex"
        onClick={() => onOpen("createEvent")}
      >
        <Plus className="h-4 w-4 mr-2" />
        Criar Evento
      </Button>
    </div>
  );
};
