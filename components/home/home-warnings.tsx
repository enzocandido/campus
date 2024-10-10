import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const notifications = [
  {
    title: "Evento ADS day",
    description: "1 hora atrás",
  },
  {
    title: "Data da prova de Inteligência Artificial alterada",
    description: "1 hora atrás",
  },
  {
    title: "Renove sua matrícula",
    description: "2 semanas atrás",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function HomeWarnings({ className, ...props }: CardProps) {
  return (
    <Card className={cn("md:w-[380px] p-4", className)} {...props}>
      <CardHeader>
        <CardTitle>Notificações</CardTitle>
        <CardDescription>Você tem 3 mensagens não lidas.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Ativar notificações
            </p>
            <p className="text-sm text-muted-foreground">
              Enviar notificações push pro seu dispositivo
            </p>
          </div>
          <Switch disabled />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Marcar tudo como lido
        </Button>
      </CardFooter>
    </Card>
  );
}
