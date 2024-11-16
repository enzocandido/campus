import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { NavigationSidebar } from "../navigation/navigation-sidebar";
import { AdminSidebar } from "./admin-sidebar";
import { AdminEvent } from "./admin-event";

export const AdminHeader = () => {
  return (
    <header className="bg-background w-full">
      <div className="px-2 flex h-20 items-center">
        <div className="flex items-center justify-between w-full p-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
              <div className="w-[72px]">
                <NavigationSidebar />
              </div>
              <AdminSidebar />
            </SheetContent>
          </Sheet>
          <span className="font-sm md:text-lg font-semibold md:ml-0">
            Admin Dashboard
          </span>
          <AdminEvent />
        </div>
      </div>
    </header>
  );
};
