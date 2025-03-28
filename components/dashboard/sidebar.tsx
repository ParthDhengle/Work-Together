"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Calendar, FileText, Home, MessageSquare, Phone, Settings, Users, Video } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

interface SidebarLinkProps {
  href: string
  icon: React.ElementType
  label: string
  isActive?: boolean
}

function SidebarLink({ href, icon: Icon, label, isActive }: SidebarLinkProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={href}>
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
            WT
          </div>
          <span className="text-lg font-semibold">Work Together</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarLink href="/dashboard" icon={Home} label="Dashboard" isActive={pathname === "/dashboard"} />
              <SidebarLink
                href="/dashboard/projects"
                icon={FileText}
                label="Projects"
                isActive={pathname.startsWith("/dashboard/projects")}
              />
              <SidebarLink
                href="/dashboard/tasks"
                icon={Calendar}
                label="Tasks"
                isActive={pathname.startsWith("/dashboard/tasks")}
              />
              <SidebarLink
                href="/dashboard/workers"
                icon={Users}
                label="Workers"
                isActive={pathname.startsWith("/dashboard/workers")}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Communication</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarLink
                href="/dashboard/chat"
                icon={MessageSquare}
                label="Chat"
                isActive={pathname.startsWith("/dashboard/chat")}
              />
              <SidebarLink
                href="/dashboard/calls/audio"
                icon={Phone}
                label="Audio Calls"
                isActive={pathname.startsWith("/dashboard/calls/audio")}
              />
              <SidebarLink
                href="/dashboard/calls/video"
                icon={Video}
                label="Video Calls"
                isActive={pathname.startsWith("/dashboard/calls/video")}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarLink
                href="/dashboard/analytics"
                icon={BarChart}
                label="Reports"
                isActive={pathname.startsWith("/dashboard/analytics")}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarLink
            href="/dashboard/settings"
            icon={Settings}
            label="Settings"
            isActive={pathname.startsWith("/dashboard/settings")}
          />
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

