"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserAvatar } from "../user-avatar";

interface Server {
  id: string;
  name: string;
  university: string | null;
  course: string | null;
  imageUrl: string;
  inviteCode: string;
}

export const AdminServers = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch("/api/admin/servers");
        if (!response.ok) {
          throw new Error("Erro ao buscar servidores.");
        }
        const data = await response.json();
        setServers(data);
      } catch (error) {
        console.error("Falha ao carregar servidores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const handleDelete = async (serverId: string) => {
    if (confirm("Tem certeza que deseja deletar este servidor?")) {
      try {
        setDeleting(serverId);
        const response = await fetch(`/api/admin/servers/${serverId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao deletar o servidor.");
        }

        setServers(servers.filter((server) => server.id !== serverId));
        toast({
          title: "Sucesso",
          description: "Servidor deletado com sucesso!",
        });
      } catch (error) {
        console.error("Falha ao deletar servidor:", error);
        toast({ title: "Erro", description: "Falha ao deletar o servidor." });
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold mb-4">Servidores</h2>
      {loading ? (
        <p>Carregando servidores...</p>
      ) : (
        <ul>
          {servers.length === 0 ? (
            <p>Nenhum servidor encontrado.</p>
          ) : (
            servers.map((server) => (
              <li
                key={server.id}
                className="mb-2 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <UserAvatar
                    src={server.imageUrl}
                    className="h-10 w-10 rounded-full inline-block mr-2"
                  />
                  <span>
                    {server.name} -{" "}
                    {server.university || "Universidade não especificada"} (
                    {server.course || "Curso não especificado"})
                  </span>
                </div>
                <Button
                  variant="destructive"
                  disabled={deleting === server.id}
                  onClick={() => handleDelete(server.id)}
                  className="ml-4"
                >
                  {deleting === server.id ? "Deletando..." : "Deletar"}
                </Button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
