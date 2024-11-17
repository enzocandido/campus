"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
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
    <nav className="flex items-center justify-between p-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
      >
        <Link
          className="tracking-widest text-2xl font-extrabold dark:text-white"
          href="/"
        >
          CAMPUS
        </Link>
      </motion.div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-white  bg-black hover:bg-opacity-30 hover:opacity-70 transition-all duration-200`}
              >
                Sobre
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white  bg-black hover:bg-opacity-30 hover:opacity-70 transition-all duration-200">
              Ajuda
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  Contato
                </NavigationMenuLink>
              </Link>
              <Link href="/howtouse" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  Como usar
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
