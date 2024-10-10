"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface DashboardCalendarProps {
  id: string;
  name: string;
}

export const DashboardCalendar = ({ id, name }: DashboardCalendarProps) => {
  return <div>
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
};
