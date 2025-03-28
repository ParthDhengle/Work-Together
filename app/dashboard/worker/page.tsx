import Link from "next/link"
import { ArrowRight, CheckCircle, Clock, MessageSquare, MoreHorizontal, XCircle } from "lucide-react"

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

// Sample data for the worker dashboard
const myTasks = [
  {
    id: 1,
    title: "Design homepage mockup",
    project: "Website Redesign",
    status: "completed",
    priority: "high",
    dueDate: "Sep 28, 2023",
  },
  {
    id: 2,
    title: "Implement authentication",
    project: "Mobile App Development",
    status: "in-progress",
    priority: "high",
    dueDate: "Oct 3, 2023",
  },
  {
    id: 3,
    title: "Create API documentation",
    project: "Mobile App Development",
    status: "pending",
    priority: "medium",
    dueDate: "Oct 10, 2023",
  },
  {
    id: 4,
    title: "User testing",
    project: "Website Redesign",
    status: "pending",
    priority: "low",
    dueDate: "Oct 12, 2023",
  },
]

const teamUpdates = [
  {
    id: 1,
    user: { name: "Alex Smith", avatar: "AS" },
    action: "completed task",
    target: "Design navigation menu",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: { name: "Maria Kim", avatar: "MK" },
    action: "commented on",
    target: "API Integration",
    time: "3 hours ago",
  },
  {
    id: 3,
    user: { name: "Robert Brown", avatar: "RB" },
    action: "started task",
    target: "Set up CI/CD pipeline",
    time: "5 hours ago",
  },
  {
    id: 4,
    user: { name: "Tina Murphy", avatar: "TM" },
    action: "uploaded file to",
    target: "Website Redesign",
    time: "Yesterday",
  },
]

const upcomingMeetings = [
  {
    id: 1,
    title: "Daily Standup",
    time: "10:00 AM - 10:15 AM",
    date: "Today",
    participants: ["JD", "AS", "MK", "RB"],
  },
  {
    id: 2,
    title: "Project Review",
    time: "2:00 PM - 3:00 PM",
    date: "Tomorrow",
    participants: ["JD", "AS", "MK", "TM"],
  },
]

export default function WorkerDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's an overview of your tasks and team updates.</p>
        </div>
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <Button>
            <Clock className="mr-2 h-4 w-4" />
            Start Timer
          </Button>
        </div>
      </div>

      {/* Workload indicator */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Your Workload</CardTitle>
          <CardDescription>Current capacity: 2/4 tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>50% Capacity</span>
              <span>2 Active Tasks</span>
            </div>
            <Progress value={50} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tasks section */}
      <div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Tasks</CardTitle>
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
                {myTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between rounded-lg border p-4 text-sm">
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
                        <p className="text-xs text-muted-foreground">
                          {task.project} • Due {task.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"
                        }
                      >
                        {task.priority}
                      </Badge>
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
                          {task.status === "pending" && <DropdownMenuItem>Start Task</DropdownMenuItem>}
                          {task.status === "in-progress" && <DropdownMenuItem>Mark as Completed</DropdownMenuItem>}
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Add Comment</DropdownMenuItem>
                          {task.status !== "completed" && <DropdownMenuItem>Request Help</DropdownMenuItem>}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="pending" className="space-y-4">
                {myTasks
                  .filter((task) => task.status === "pending")
                  .map((task) => (
                    <div key={task.id} className="flex items-center justify-between rounded-lg border p-4 text-sm">
                      <div className="flex items-center gap-3">
                        <XCircle className="h-5 w-5 text-gray-300" />
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {task.project} • Due {task.dueDate}
                          </p>
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
                        <Button size="sm">Start Task</Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="in-progress" className="space-y-4">
                {myTasks
                  .filter((task) => task.status === "in-progress")
                  .map((task) => (
                    <div key={task.id} className="flex items-center justify-between rounded-lg border p-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {task.project} • Due {task.dueDate}
                          </p>
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
                        <Button size="sm">Complete</Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="completed" className="space-y-4">
                {myTasks
                  .filter((task) => task.status === "completed")
                  .map((task) => (
                    <div key={task.id} className="flex items-center justify-between rounded-lg border p-4 text-sm">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {task.project} • Due {task.dueDate}
                          </p>
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
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Team Updates and Meetings */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Team Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Team Updates</CardTitle>
            <CardDescription>Recent activity from your team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamUpdates.map((update) => (
                <div key={update.id} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                  <Avatar className="mt-0.5">
                    <AvatarFallback>{update.user.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p>
                      <span className="font-medium">{update.user.name}</span>{" "}
                      <span className="text-muted-foreground">{update.action}</span>{" "}
                      <span className="text-primary">{update.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>Your scheduled meetings and calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="rounded-lg border p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{meeting.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {meeting.date} • {meeting.time}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Join
                    </Button>
                  </div>
                  <div className="mt-2 flex -space-x-2">
                    {meeting.participants.map((participant, i) => (
                      <Avatar key={i} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-xs">{participant}</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                      +2
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

