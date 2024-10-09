"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardWarningsProps {
  id: string;
  name: string;
}

export const DashboardWarnings = ({ id, name }: DashboardWarningsProps) => {
  return (
    <div className="m-8">
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Avisos</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 space-y-2"></div>
        </CardContent>
      </Card>
    </div>
  );
};
