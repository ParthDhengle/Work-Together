"use client"

import { SidebarHeader,Sidebar as UISidebar} from "@/components/ui/sidebar"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Phone,
  Settings,
  Users,
  Video,
  FolderOpen,
  CheckSquare,
  Bell
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
  role?: "manager" | "leader" | "worker" | "all"
  userRole?: string
}

function SidebarLink({ href, icon: Icon, label, isActive, role = "all", userRole }: SidebarLinkProps) {
  // If the link is role-specific and doesn't match the user's role, don't render it
  if (role !== "all" && userRole && role !== userRole) {
    return null
  }

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
interface DashboardSidebarProps {
  userRole: "manager" | "leader" | "worker"
}

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const pathname = usePathname()
  // In a real app, this would come from authentication context
  const menuItems = {
    manager: [
      { href: "/dashboard", label: "Overview", icon: Home },
      { href: "/dashboard/projects", label: "Projects", icon: Users },
      { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
      { href: "/dashboard/reports", label: "Reports", icon: FileText },
      { href: "/dashboard/team", label: "Team", icon: Users },
      { href: "/dashboard/chat", label: "Chat", icon: MessageSquare },
      { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
    leader: [
      { href: "/dashboard/leader", label: "Overview", icon: Home },
      { href: "/dashboard/leader/team", label: "Team", icon: Users },
      { href: "/dashboard/leader/tasks", label: "Tasks", icon: CheckSquare },
      { href: "/dashboard/leader/assignments", label: "Assignments", icon: CheckSquare },
      { href: "/dashboard/leader/chat", label: "Chat", icon: MessageSquare },
      { href: "/dashboard/leader/notifications", label: "Notifications", icon: Bell },
      { href: "/dashboard/leader/settings", label: "Settings", icon: Settings },
    ],
    worker: [
      { href: "/dashboard/worker", label: "Overview", icon: Home },
      { href: "/dashboard/worker/tasks", label: "Tasks", icon: CheckSquare },
      { href: "/dashboard/worker/chat", label: "Chat", icon: MessageSquare },
      { href: "/dashboard/worker/notifications", label: "Notifications", icon: Bell },
      { href: "/dashboard/worker/settings", label: "Settings", icon: Settings },
    ],
  }

  const items = menuItems[userRole]

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
              <SidebarLink
                href="/dashboard"
                icon={Home}
                label="Overview"
                isActive={pathname === "/dashboard"}
                userRole={userRole}
              />
              <SidebarLink
                href="/dashboard/tasks"
                icon={CheckSquare}
                label="Tasks"
                isActive={pathname.startsWith("/dashboard/tasks")}
                userRole={userRole}
              />
              <SidebarLink
                href="/dashboard/projects"
                icon={FileText}
                label="Projects"
                isActive={pathname.startsWith("/dashboard/projects")}
                userRole={userRole}
              />
              <SidebarLink
                href="/dashboard/team"
                icon={Users}
                label="Team"
                isActive={pathname.startsWith("/dashboard/team")}
                role="leader"
                userRole={userRole}
              />
              <SidebarLink
                href="/dashboard/files"
                icon={FolderOpen}
                label="Files"
                isActive={pathname.startsWith("/dashboard/files")}
                userRole={userRole}
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
                userRole={userRole}
              />
              <SidebarLink
                href="/dashboard/calls/audio"
                icon={Phone}
                label="Audio Calls"
                isActive={pathname.startsWith("/dashboard/calls/audio")}
                userRole={userRole}
              />
              <SidebarLink
                href="/dashboard/calls/video"
                icon={Video}
                label="Video Calls"
                isActive={pathname.startsWith("/dashboard/calls/video")}
                userRole={userRole}
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
                role="manager"
                userRole={userRole}
              />
              <SidebarLink
                href="/dashboard/calendar"
                icon={Calendar}
                label="Calendar"
                isActive={pathname.startsWith("/dashboard/calendar")}
                userRole={userRole}
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
            userRole={userRole}
          />
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

