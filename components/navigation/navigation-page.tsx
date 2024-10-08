"use client";

import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { SquareMenu, Bell } from "lucide-react";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationPageProps {
  url: string;
  name: string;
}

export const NavigationPage = ({ url, name }: NavigationPageProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (url !== "notifications") {
      router.push(`/${url}`);
    }
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all opacity-0 w-[4px]",
            pathname !== `/${url}` &&
              "group-hover:h-[20px] group-hover:opacity-100",
            url === "notifications" ? "opacity-100" : "opacity-0",
            pathname === `/${url}` ? "h-[36px] opacity-100" : "h-[8px]",
          )}
        />
        <div
          className={cn(
            "flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-[#1f1f1f] group-hover:bg-[#141414]",
            pathname === `/${url}` &&
              "bg-primary/10 text-primary rounded-[16px]",
          )}
        >
          {url === "dashboard" && <SquareMenu />}
          {url === "notifications" && <Bell />}
        </div>
      </button>
    </ActionTooltip>
  );
};
