"use client";

import qs from "query-string";
import { useState } from "react";
import axios from "axios";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DeleteTaskModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "deleteTask";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onClick = async () => {

    try {
      setIsLoading(true);
      setErrorMessage("");

      //implementar api

      onClose();
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
      setErrorMessage("Ocorreu um erro ao tentar apagar a tarefa.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Apagar Tarefa
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Tem certeza que deseja continuar?
            <br />A tarefa será apagada permanentemente.
          </DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <div className="px-6 text-center text-red-500">{errorMessage}</div>
        )}
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancelar
            </Button>
            <Button disabled={isLoading} onClick={onClick} variant="primary">
              {isLoading ? "Apagando..." : "Apagar"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
