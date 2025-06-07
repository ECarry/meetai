"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { BotIcon, Star, VideoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  {
    label: "Meetings",
    href: "/meetings",
    icon: <VideoIcon className="h-5 w-5" />,
  },
  {
    label: "Agents",
    href: "/agents",
    icon: <BotIcon className="h-5 w-5" />,
  },
];

const secondSection = [
  {
    label: "Upgrade",
    href: "/upgrade",
    icon: <Star className="h-5 w-5" />,
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image height={36} width={36} src="/logo.svg" alt="Logo" />
          <p className="text-2xl font-bold">Meet.Ai</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklab border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                      pathname.startsWith(item.href) &&
                        "bg-linear-to-r/oklab border-[#5D6B68]/10"
                    )}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="opacity-10 text-[#5D6B68]" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklab border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                      pathname.startsWith(item.href) &&
                        "bg-linear-to-r/oklab border-[#5D6B68]/10"
                    )}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
