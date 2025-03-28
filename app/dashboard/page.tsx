"use client"

import { Tooltip } from "@/components/ui/tooltip"

import Link from "next/link"
import { ArrowRight, CheckCircle, Clock, FileText, MoreHorizontal, Plus, Users, XCircle } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
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

const tasks = [
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

const projectStatusData = [
  { name: "Not Started", value: projects.filter((p) => p.status === "pending").length },
  { name: "In Progress", value: projects.filter((p) => p.status === "in-progress").length },
  { name: "Completed", value: projects.filter((p) => p.status === "completed").length },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const workers = [
  {
    id: 1,
    name: "Alex Smith",
    avatar: "AS",
    role: "Frontend Developer",
    status: "available",
    load: { current: 2, capacity: 5 },
  },
  {
    id: 2,
    name: "Maria Kim",
    avatar: "MK",
    role: "Backend Developer",
    status: "busy",
    load: { current: 5, capacity: 5 },
  },
  {
    id: 3,
    name: "John Doe",
    avatar: "JD",
    role: "Project Manager",
    status: "available",
    load: { current: 1, capacity: 3 },
  },
  {
    id: 4,
    name: "Robert Brown",
    avatar: "RB",
    role: "DevOps Engineer",
    status: "available",
    load: { current: 0, capacity: 4 },
  },
  {
    id: 5,
    name: "Tina Murphy",
    avatar: "TM",
    role: "UI/UX Designer",
    status: "busy",
    load: { current: 3, capacity: 3 },
  },
]

export default function ManagerDashboard() {
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
        </div>
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Create a new project and assign it to a team member.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" placeholder="Enter project name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea id="project-description" placeholder="Enter project description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-deadline">Deadline</Label>
                    <Input id="project-deadline" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-team-size">Team Size</Label>
                    <Input id="project-team-size" type="number" placeholder="Enter team size" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+1 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects section */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Projects</h2>
          <Link href="/dashboard/projects">
            <Button variant="ghost" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
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
                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                    <DropdownMenuItem>View Tasks</DropdownMenuItem>
                    <DropdownMenuItem>Add Team Member</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
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

      {/* Project Status Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status</CardTitle>
          <CardDescription>Overview of project statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
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
        </CardContent>
      </Card>

      {/* Tasks and Workers section */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Tasks */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Tasks</CardTitle>
                <Link href="/dashboard/tasks">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                      <div className="flex items-center gap-3">
                        {task.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : task.status === "in-progress" ? (
                          <Clock className="h-5 w-5 text-amber-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300" />
                        )}
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">Due {task.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {task.priority}
                        </Badge>
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="pending" className="space-y-4">
                  {tasks
                    .filter((task) => task.status === "pending")
                    .map((task) => (
                      <div key={task.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                        <div className="flex items-center gap-3">
                          <XCircle className="h-5 w-5 text-gray-300" />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-xs text-muted-foreground">Due {task.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : task.priority === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {task.priority}
                          </Badge>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    ))}
                </TabsContent>
                <TabsContent value="in-progress" className="space-y-4">
                  {tasks
                    .filter((task) => task.status === "in-progress")
                    .map((task) => (
                      <div key={task.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-amber-500" />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-xs text-muted-foreground">Due {task.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : task.priority === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {task.priority}
                          </Badge>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    ))}
                </TabsContent>
                <TabsContent value="completed" className="space-y-4">
                  {tasks
                    .filter((task) => task.status === "completed")
                    .map((task) => (
                      <div key={task.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-xs text-muted-foreground">Due {task.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : task.priority === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {task.priority}
                          </Badge>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Workers */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Link href="/dashboard/workers">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workers.map((worker) => (
                  <div key={worker.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{worker.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{worker.name}</p>
                        <p className="text-xs text-muted-foreground">{worker.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            worker.status === "available"
                              ? "bg-green-500"
                              : worker.status === "busy"
                                ? "bg-amber-500"
                                : "bg-gray-300"
                          }`}
                        />
                        <span className="text-xs capitalize">{worker.status}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {worker.load.current}/{worker.load.capacity} tasks
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

