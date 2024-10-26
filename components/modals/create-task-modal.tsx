//@ts-nocheck

"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import moment from "moment";
import "moment/locale/pt-br";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "O título é obrigatório.")
    .max(30, "O tamanho máximo para o título da tarefa é de 30 caracteres."),
  description: z.string().optional(),
  fileUrl: z.string().optional(),
  dueDate: z.date(),
});

export const CreateTaskModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { server } = data;
  const [serverName, setServerName] = useState("");
  const [serverId, setServerId] = useState("");

  const isModalOpen = isOpen && type === "createTask";

  useEffect(() => {
    if (server) {
      setServerName(server.name);
      setServerId(server.id);
    }
  }, [server]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      fileUrl: "",
      dueDate: new Date(),
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = {
        ...values,
        className: serverName,
        serverId: serverId,
      };

      await axios.post("/api/academic/tasks", data);
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Adicionar tarefa
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            A tarefa estará disponível a todos os membros de {serverName}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Título*
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black"
                        placeholder="Insira o título da tarefa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black"
                        placeholder="Adicione uma descrição"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Data de Vencimento*
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="dueDate"
                        render={({ field: { onChange, value } }) => (
                          <div className="relative">
                            <Datetime
                              value={moment(value)}
                              onChange={(date) =>
                                onChange(moment(date).toDate())
                              }
                              className="w-64 text-sm shadow rounded py-3 px-2 text-zinc-500"
                              locale="pt-BR"
                            />
                            <Calendar className="absolute left-52 top-1/2 transform -translate-y-1/2 w-6 h-6 text-zinc-500" />
                          </div>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-8 px-6 text-center">
              <div className="flex items-center justify-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <span className="text-xs font-light text-zinc-500 mt-2">
                Após selecionar o arquivo, clique em "Enviar arquivo" novamente
              </span>
            </div>

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Criar Tarefa"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
