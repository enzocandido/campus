import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Server, Member, User } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: Member & { profile: User };
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export interface Submission {
  id: string;
  studentId: string;
  student: {
    name: string;
  };
  fileUrl?: string;
  content: string;
  graded: boolean;
  status?: "approved" | "rejected";
  feedback?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  dueDate: string;
  className: string;
  professor?: {
    name: string;
  };
  submissions: Submission[];
}
