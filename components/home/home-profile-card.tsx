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

interface HomeProfileCardProps {
  name: string;
  ra?: string;
  email: string;
  imageUrl: string;
  university: string;
  course: string;
}

export const HomeProfileCard = ({
  name,
  ra,
  email,
  imageUrl,
  university,
  course,
}: HomeProfileCardProps) => {
  return (
    <div className="w-full h-full">
      <Card className="text-center md:flex items-center justify-around p-4">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{email}</CardDescription>
          <Avatar className="flex justify-center">
            <AvatarImage
              className="h-64 w-64 rounded-md"
              src={imageUrl}
              alt={`Avatar de ${name}`}
            />
          </Avatar>
        </CardHeader>
        <CardContent className="items-center">
          <div className="mt-4 space-y-2">
            {ra && <p className="text-sm">RA: {ra}</p>}
            <p className="text-sm">Curso: {course}</p>
            <p className="text-sm">Universidade: {university}</p>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button disabled className="flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Editar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
