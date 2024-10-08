import { MessageCircle } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-[#141414] flex items-center justify-center">
          <MessageCircle className="h-12 w-12 text-white" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? "Bem-vindo(a) a " : ""}
        <span className="italic">{name}</span>
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `Esse é o começo do canal ${name}`
          : `Esse é o começo da sua conversa com ${name}`}
      </p>
    </div>
  );
};
