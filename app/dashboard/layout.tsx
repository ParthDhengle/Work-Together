"use client"

import type React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, this would come from authentication
  const userInfo = {
    name: "John Doe",
    role: "manager" as const,
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader userRole={userInfo.role} userName={userInfo.name} />
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

