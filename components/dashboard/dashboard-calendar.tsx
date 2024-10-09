"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { AvatarImage } from "../ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { Edit2 } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { ptBR } from "date-fns/locale/pt-BR";

interface DashboardCalendarProps {
  id: string;
  name: string;
}

export const DashboardCalendar = ({ id, name }: DashboardCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="m-8">
      <Card className="text-center">
        <Calendar
        locale={ptBR}
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </Card>
    </div>
  );
};
