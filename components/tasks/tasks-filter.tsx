import { Search, SortAsc, SortDesc, Filter, X, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TaskFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  statusFilter: "all" | "pending" | "expired" | "submitted";
  setStatusFilter: (value: "all" | "pending" | "expired" | "submitted") => void;
  classFilter: string;
  setClassFilter: (value: string) => void;
  dateFilter: Date | undefined;
  setDateFilter: (value: Date | undefined) => void;
  uniqueClasses: string[];
}

export function TaskFilters({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  statusFilter,
  setStatusFilter,
  classFilter,
  setClassFilter,
  dateFilter,
  setDateFilter,
  uniqueClasses,
}: TaskFiltersProps) {
  const clearFilters = () => {
    setStatusFilter("all");
    setClassFilter("all");
    setDateFilter(undefined);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            value={sortOrder}
            onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">
                <div className="flex items-center">
                  <SortAsc className="mr-2 h-4 w-4" />
                  Mais próxima
                </div>
              </SelectItem>
              <SelectItem value="desc">
                <div className="flex items-center">
                  <SortDesc className="mr-2 h-4 w-4" />
                  Mais distante
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                Todas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pendentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("expired")}>
                Expiradas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("submitted")}>
                Enviadas
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Disciplinas</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setClassFilter("all")}>
                Todas
              </DropdownMenuItem>
              {uniqueClasses.map((className) => (
                <DropdownMenuItem
                  key={className}
                  onClick={() => setClassFilter(className)}
                >
                  {className}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, "PPP") : "Filtrar por data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {statusFilter !== "all" && (
          <Badge variant="secondary" className="text-xs">
            Status:{" "}
            {statusFilter === "pending"
              ? "Pendentes"
              : statusFilter === "expired"
              ? "Expiradas"
              : "Enviadas"}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1"
              onClick={() => setStatusFilter("all")}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {classFilter !== "all" && (
          <Badge variant="secondary" className="text-xs">
            Disciplina: {classFilter}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1"
              onClick={() => setClassFilter("all")}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {dateFilter && (
          <Badge variant="secondary" className="text-xs">
            Data: {format(dateFilter, "dd/MM/yyyy")}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1"
              onClick={() => setDateFilter(undefined)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {(statusFilter !== "all" || classFilter !== "all" || dateFilter) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpar filtros
          </Button>
        )}
      </div>
    </>
  );
}
