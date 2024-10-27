"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserAvatar } from "../user-avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, Trash2, School, Book } from "lucide-react";
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
  const [filteredServers, setFilteredServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [serverToDelete, setServerToDelete] = useState<Server | null>(null);
  const { toast } = useToast();

  const serversPerPage = 5;

  useEffect(() => {
    const fetchServers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/servers");
        if (!response.ok) {
          throw new Error("Erro ao buscar servidores.");
        }
        const data = await response.json();
        setServers(data);
        setFilteredServers(data);
      } catch (error) {
        console.error("Falha ao carregar servidores:", error);
        toast({
          title: "Erro",
          description: "Falha ao carregar os servidores.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, [toast]);

  useEffect(() => {
    const results = servers.filter(
      (server) =>
        server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (server.university &&
          server.university.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (server.course &&
          server.course.toLowerCase().includes(searchTerm.toLowerCase())),
    );
    setFilteredServers(results);
    setCurrentPage(1);
  }, [searchTerm, servers]);

  const handleDelete = async (serverId: string) => {
    try {
      setDeleting(serverId);
      const response = await fetch(`/api/admin/servers/${serverId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o servidor.");
      }

      setServers(servers.filter((server) => server.id !== serverId));
      setFilteredServers(
        filteredServers.filter((server) => server.id !== serverId),
      );
      toast({
        title: "Sucesso",
        description: "Servidor deletado com sucesso!",
      });
    } catch (error) {
      console.error("Falha ao deletar servidor:", error);
      toast({ title: "Erro", description: "Falha ao deletar o servidor." });
    } finally {
      setDeleting(null);
      setServerToDelete(null);
    }
  };

  const indexOfLastServer = currentPage * serversPerPage;
  const indexOfFirstServer = indexOfLastServer - serversPerPage;
  const currentServers = filteredServers.slice(
    indexOfFirstServer,
    indexOfLastServer,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Servidores</h2>
        <div className="mb-4 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar servidores..."
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
              {currentServers.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-muted-foreground"
                >
                  Nenhum servidor encontrado.
                </motion.p>
              ) : (
                <ul className="space-y-4">
                  {currentServers.map((server) => (
                    <motion.li
                      key={server.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex justify-between items-center md:p-4 rounded-lg shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <UserAvatar
                          src={server.imageUrl}
                          className="h-10 w-10"
                        />
                        <div>
                          <p className="font-semibold">{server.name}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <School className="md:h-4 md:w-4 mr-2" />
                            <span className="w-11/12">
                              {server.university ||
                                "Universidade não especificada"}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Book className="md:h-4 md:w-4 mr-2" />
                            <span className="w-11/12">
                              {server.course || "Curso não especificado"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deleting === server.id}
                        onClick={() => setServerToDelete(server)}
                      >
                        {deleting === server.id ? (
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
            {filteredServers.length > serversPerPage && (
              <div className="flex justify-center space-x-2 mt-4">
                {Array.from({
                  length: Math.ceil(filteredServers.length / serversPerPage),
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
        open={!!serverToDelete}
        onOpenChange={() => setServerToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              servidor {serverToDelete?.name} e removerá seus dados de nossos
              servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex space-y-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => serverToDelete && handleDelete(serverToDelete.id)}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
