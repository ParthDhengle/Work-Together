"use client"

import { Tooltip } from "@/components/ui/tooltip"

import Link from "next/link"
import { ArrowRight, MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { ChartContainer } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

// Sample data for the dashboard
const projects = [
  {
    id: 1,
    name: "Website Redesign",
    progress: 75,
    tasks: { total: 24, completed: 18 },
    team: ["JD", "AS", "MK"],
    deadline: "Oct 15, 2023",
    status: "in-progress",
  },
  {
    id: 2,
    name: "Mobile App Development",
    progress: 45,
    tasks: { total: 32, completed: 14 },
    team: ["RB", "TM", "AS"],
    deadline: "Nov 30, 2023",
    status: "pending",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    progress: 90,
    tasks: { total: 18, completed: 16 },
    team: ["JD", "MK"],
    deadline: "Oct 5, 2023",
    status: "completed",
  },
]

const teamTasks = [
  {
    id: 1,
    title: "Design homepage mockup",
    status: "completed",
    priority: "high",
    assignee: { name: "Alex Smith", avatar: "AS" },
    dueDate: "Sep 28, 2023",
  },
  {
    id: 2,
    title: "Implement authentication",
    status: "in-progress",
    priority: "high",
    assignee: { name: "Maria Kim", avatar: "MK" },
    dueDate: "Oct 3, 2023",
  },
  {
    id: 3,
    title: "Create API documentation",
    status: "pending",
    priority: "medium",
    assignee: { name: "John Doe", avatar: "JD" },
    dueDate: "Oct 10, 2023",
  },
  {
    id: 4,
    title: "Set up CI/CD pipeline",
    status: "in-progress",
    priority: "medium",
    assignee: { name: "Robert Brown", avatar: "RB" },
    dueDate: "Oct 5, 2023",
  },
  {
    id: 5,
    title: "User testing",
    status: "pending",
    priority: "low",
    assignee: { name: "Tina Murphy", avatar: "TM" },
    dueDate: "Oct 12, 2023",
  },
]

const teamMembers = [
  {
    id: 1,
    name: "Alex Smith",
    avatar: "AS",
    role: "Frontend Developer",
    status: "available",
    load: { current: 2, capacity: 5 },
    lastActive: "2 mins ago",
  },
  {
    id: 2,
    name: "Maria Kim",
    avatar: "MK",
    role: "Backend Developer",
    status: "busy",
    load: { current: 4, capacity: 5 },
    lastActive: "Just now",
  },
  {
    id: 3,
    name: "Robert Brown",
    avatar: "RB",
    role: "DevOps Engineer",
    status: "available",
    load: { current: 3, capacity: 5 },
    lastActive: "5 mins ago",
  },
  {
    id: 4,
    name: "Tina Murphy",
    avatar: "TM",
    role: "UX Designer",
    status: "offline",
    load: { current: 0, capacity: 4 },
    lastActive: "3 hours ago",
  },
]

const projectStatusData = [
  { name: "Not Started", value: projects.filter((p) => p.status === "pending").length },
  { name: "In Progress", value: projects.filter((p) => p.status === "in-progress").length },
  { name: "Completed", value: projects.filter((p) => p.status === "completed").length },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const teamProjects = projects

export default function LeaderDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's an overview of your team's progress.</p>
        </div>
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Assign Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Assign New Task</DialogTitle>
                <DialogDescription>Create a new task and assign it to a team member.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input id="task-title" placeholder="Enter task title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="task-description">Description</Label>
                  <Textarea id="task-description" placeholder="Enter task description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="task-priority">Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="task-priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-assignee">Assignee</Label>
                    <Select>
                      <SelectTrigger id="task-assignee">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id.toString()}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="task-due-date">Due Date</Label>
                  <Input id="task-due-date" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Team Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Task completion rates over the past month</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Team Projects */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Team Projects</h2>
          <Link href="/dashboard/projects">
            <Button variant="ghost" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {teamProjects.map((project) => (
            <Card key={project.id} className="hover-scale">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>Due {project.deadline}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Project</DropdownMenuItem>
                    <DropdownMenuItem>View Tasks</DropdownMenuItem>
                    <DropdownMenuItem>Add Team Member</DropdownMenuItem>
                    <DropdownMenuItem>Generate Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>
                <div className="flex justify-between text-sm">
                  <span>
                    Tasks: {project.tasks.completed}/{project.tasks.total}
                  </span>
                  <div className="flex -space-x-2">
                    {project.team.map((member, i) => (
                      <Avatar key={i} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-xs">{member}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team Members</CardTitle>
            <Link href="/dashboard/team">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <CardDescription>Current workload and availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        member.status === "available"
                          ? "bg-green-500"
                          : member.status === "busy"
                            ? "bg-amber-500"
                            : "bg-gray-300"
                      }`}
                    />
                    <span className="text-xs capitalize">{member.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {member.load.current}/{member.load.capacity} tasks
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Manage Team
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

