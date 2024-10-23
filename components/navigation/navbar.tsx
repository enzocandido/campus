import Link from "next/link";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-around p-8 ">
      <Link className="tracking-widest text-2xl font-extrabold " href="/">
        CAMPUS
      </Link>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle() }>
                  Sobre
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Ajuda</NavigationMenuTrigger>
              <NavigationMenuContent>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-40`}>
                    Contato
                  </NavigationMenuLink>
                </Link>
                <Link href="/howtouse" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-40`}>
                    Como usar
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
