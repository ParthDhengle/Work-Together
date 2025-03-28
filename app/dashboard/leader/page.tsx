import Link from "next/link"
import { ArrowRight, BarChart, CheckCircle, Clock, FileText, MoreHorizontal, Users, XCircle } from "lucide-react"

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

// Sample data for the leader dashboard
const teamProjects = [
  {
    id: 1,
    name: "Website Redesign",
    progress: 75,
    tasks: { total: 24, completed: 18 },
    team: ["JD", "AS", "MK"],
    deadline: "Oct 15, 2023",
  },
  {
    id: 2,
    name: "Mobile App Development",
    progress: 45,
    tasks: { total: 32, completed: 14 },
    team: ["RB", "TM", "AS"],
    deadline: "Nov 30, 2023",
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
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Team Report
          </Button>
        </div>
      </div>

      {/* Team Progress Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Tasks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="flex gap-1 mr-2">
                <span className="text-green-500">32</span> completed,
                <span className="text-amber-500">18</span> in progress,
                <span className="text-muted">6</span> pending
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="flex gap-1 mr-2">
                <span className="text-green-500">2</span> available,
                <span className="text-amber-500">1</span> busy,
                <span className="text-muted">1</span> offline
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Load</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3/5</div>
            <p className="text-xs text-muted-foreground">Tasks per team member</p>
          </CardContent>
        </Card>
      </div>

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

      {/* Team Tasks and Members */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Team Tasks */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Tasks</CardTitle>
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
                  {teamTasks.map((task) => (
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Reassign Task</DropdownMenuItem>
                            <DropdownMenuItem>Add Comment</DropdownMenuItem>
                            <DropdownMenuItem>Submit Feedback</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="pending" className="space-y-4">
                  {teamTasks
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
                  {teamTasks
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
                  {teamTasks
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

        {/* Team Members */}
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
      </div>
    </div>
  )
}

