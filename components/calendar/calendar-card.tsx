"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CalendarCardProps {
  id: string;
  name: string;
}

export const CalendarCard = ({ id, name }: CalendarCardProps) => {
  return (
    <div>
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Calendário</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 space-y-2"></div>
        </CardContent>
      </Card>
    </div>
  );
};
