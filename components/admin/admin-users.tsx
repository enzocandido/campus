"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserAvatar } from "../user-avatar";

interface User {
  id: string;
  name: string;
  email: string;
  academicRole: string;
  imageUrl: string;
}

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/users");
        if (!response.ok) {
          throw new Error("Erro ao buscar os usuários.");
        }
        const data = await response.json();

        const mappedUsers = data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          academicRole: user.academicRole,
          imageUrl: user.imageUrl,
        }));

        setUsers(mappedUsers);
        console.log("Usuários setados:", mappedUsers);
      } catch (error) {
        console.error(error);
        toast({ title: "Erro", description: "Falha ao carregar os usuários." });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        setDeleting(userId);
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao deletar o usuário.");
        }

        setUsers(users.filter((user) => user.id !== userId));
        toast({
          title: "Sucesso",
          description: "Usuário deletado com sucesso!",
        });
      } catch (error) {
        console.error(error);
        toast({ title: "Erro", description: "Falha ao deletar o usuário." });
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold mb-4">Usuários</h2>

      {loading ? (
        <p>Carregando usuários...</p>
      ) : (
        <ul>
          {users.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            users.map((user) => (
              <li
                key={user.id}
                className="mb-4 flex justify-between gap-2 items-center"
              >
                <UserAvatar src={user.imageUrl} />
                <div>
                  <p className="font-semibold">
                    {user.name} ({user.academicRole}) - {user.email}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  disabled={deleting === user.id}
                  onClick={() => handleDelete(user.id)}
                >
                  {deleting === user.id ? "Deletando..." : "Deletar"}
                </Button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
