"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserAvatar } from "../user-avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, Trash2 } from "lucide-react";
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

interface User {
  id: string;
  name: string;
  email: string;
  academicRole: string;
  imageUrl: string;
}

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { toast } = useToast();

  const usersPerPage = 5;

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
          id: user.id || "",
          name: user.name || "Sem Nome",
          email: user.email || "Sem Email",
          academicRole: user.academicRole || "Sem Cargo Acadêmico",
          imageUrl: user.imageUrl || "",
        }));

        setUsers(mappedUsers);
        setFilteredUsers(mappedUsers);
      } catch (error) {
        console.error(error);
        toast({ title: "Erro", description: "Falha ao carregar os usuários." });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.academicRole.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const handleDelete = async (userId: string) => {
    try {
      setDeleting(userId);
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o usuário.");
      }

      setUsers(users.filter((user) => user.id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      toast({
        title: "Sucesso",
        description: "Usuário deletado com sucesso!",
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Erro", description: "Falha ao deletar o usuário." });
    } finally {
      setDeleting(null);
      setUserToDelete(null);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Usuários</h2>
        <div className="mb-4 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <AnimatePresence>
              {currentUsers.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-muted-foreground"
                >
                  Nenhum usuário encontrado.
                </motion.p>
              ) : (
                <ul className="space-y-4">
                  {currentUsers.map((user) => (
                    <motion.li
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex justify-between items-center md:p-4 rounded-lg shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <UserAvatar src={user.imageUrl} className="h-10 w-10" />
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-muted-foreground max-w-32">
                            {user.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.academicRole}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deleting === user.id}
                        onClick={() => setUserToDelete(user)}
                      >
                        {deleting === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </AnimatePresence>
            {filteredUsers.length > usersPerPage && (
              <div className="flex justify-center space-x-2 mt-4">
                {Array.from({
                  length: Math.ceil(filteredUsers.length / usersPerPage),
                }).map((_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a
              conta do usuário {userToDelete?.name} e removerá seus dados de
              nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex space-y-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => userToDelete && handleDelete(userToDelete.id)}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
