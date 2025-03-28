"use client"

import { useState } from "react"
import { CheckCircle, Clock, MoreHorizontal, Plus, Search, Trash2, XCircle, Edit, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample team members data
const teamMembers = [
  { id: 1, name: "Alex Smith", avatar: "AS" },
  { id: 2, name: "Maria Kim", avatar: "MK" },
  { id: 3, name: "Robert Brown", avatar: "RB" },
  { id: 4, name: "Tina Murphy", avatar: "TM" },
  { id: 5, name: "John Doe", avatar: "JD" },
]

// Sample tasks data
const initialTasks = [
  {
    id: 1,
    title: "Design homepage mockup",
    description: "Create a modern and clean homepage design for the website redesign project.",
    status: "completed",
    priority: "high",
    assignee: teamMembers[0],
    dueDate: "2023-09-28",
    project: "Website Redesign",
  },
  {
    id: 2,
    title: "Implement authentication",
    description: "Set up user authentication with JWT and secure routes.",
    status: "in-progress",
    priority: "high",
    assignee: teamMembers[1],
    dueDate: "2023-10-03",
    project: "Mobile App Development",
  },
  {
    id: 3,
    title: "Create API documentation",
    description: "Document all API endpoints with examples and response schemas.",
    status: "pending",
    priority: "medium",
    assignee: teamMembers[4],
    dueDate: "2023-10-10",
    project: "Mobile App Development",
  },
  {
    id: 4,
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment.",
    status: "in-progress",
    priority: "medium",
    assignee: teamMembers[2],
    dueDate: "2023-10-05",
    project: "Website Redesign",
  },
  {
    id: 5,
    title: "User testing",
    description: "Conduct user testing sessions with 5-7 participants.",
    status: "pending",
    priority: "low",
    assignee: teamMembers[3],
    dueDate: "2023-10-12",
    project: "Website Redesign",
  },
  {
    id: 6,
    title: "Optimize database queries",
    description: "Improve performance of slow database queries.",
    status: "pending",
    priority: "high",
    assignee: teamMembers[1],
    dueDate: "2023-10-07",
    project: "Mobile App Development",
  },
  {
    id: 7,
    title: "Fix responsive layout issues",
    description: "Address layout problems on mobile devices.",
    status: "completed",
    priority: "medium",
    assignee: teamMembers[0],
    dueDate: "2023-09-25",
    project: "Website Redesign",
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<any>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    assigneeId: "",
    dueDate: "",
    project: "",
  })

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle creating a new task
  const handleCreateTask = () => {
    const assignee = teamMembers.find((member) => member.id.toString() === newTask.assigneeId) || teamMembers[0]

    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      assignee,
      dueDate: newTask.dueDate,
      project: newTask.project,
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      assigneeId: "",
      dueDate: "",
      project: "",
    })
    setIsNewTaskDialogOpen(false)
  }

  // Handle editing a task
  const handleEditTask = () => {
    const assignee =
      teamMembers.find((member) => member.id.toString() === currentTask.assigneeId) || currentTask.assignee

    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id
        ? {
            ...task,
            title: currentTask.title,
            description: currentTask.description,
            status: currentTask.status,
            priority: currentTask.priority,
            assignee,
            dueDate: currentTask.dueDate,
            project: currentTask.project,
          }
        : task,
    )

    setTasks(updatedTasks)
    setIsEditTaskDialogOpen(false)
  }

  // Handle deleting a task
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  // Handle status change
  const handleStatusChange = (taskId: number, newStatus: string) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    setTasks(updatedTasks)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>Add a new task to your project. Fill in the details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project">Project</Label>
                    <Input
                      id="project"
                      placeholder="Project name"
                      value={newTask.project}
                      onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                    >
                      <SelectTrigger id="priority">
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
                    <Label htmlFor="assignee">Assignee</Label>
                    <Select
                      value={newTask.assigneeId}
                      onValueChange={(value) => setNewTask({ ...newTask, assigneeId: value })}
                    >
                      <SelectTrigger id="assignee">
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
                  <Label htmlFor="dueDate">Due Date</Label>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewTaskDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask}>Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <TaskTable
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onEdit={(task) => {
              setCurrentTask({
                ...task,
                assigneeId: task.assignee.id.toString(),
              })
              setIsEditTaskDialogOpen(true)
            }}
          />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <TaskTable
            tasks={filteredTasks.filter((task) => task.status === "pending")}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onEdit={(task) => {
              setCurrentTask({
                ...task,
                assigneeId: task.assignee.id.toString(),
              })
              setIsEditTaskDialogOpen(true)
            }}
          />
        </TabsContent>
        <TabsContent value="in-progress" className="mt-4">
          <TaskTable
            tasks={filteredTasks.filter((task) => task.status === "in-progress")}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onEdit={(task) => {
              setCurrentTask({
                ...task,
                assigneeId: task.assignee.id.toString(),
              })
              setIsEditTaskDialogOpen(true)
            }}
          />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <TaskTable
            tasks={filteredTasks.filter((task) => task.status === "completed")}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onEdit={(task) => {
              setCurrentTask({
                ...task,
                assigneeId: task.assignee.id.toString(),
              })
              setIsEditTaskDialogOpen(true)
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Edit Task Dialog */}
      {currentTask && (
        <Dialog open={isEditTaskDialogOpen} onOpenChange={setIsEditTaskDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Update the task details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Task Title</Label>
                <Input
                  id="edit-title"
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentTask.description}
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-project">Project</Label>
                  <Input
                    id="edit-project"
                    value={currentTask.project}
                    onChange={(e) => setCurrentTask({ ...currentTask, project: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={currentTask.status}
                    onValueChange={(value) => setCurrentTask({ ...currentTask, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={currentTask.priority}
                    onValueChange={(value) => setCurrentTask({ ...currentTask, priority: value })}
                  >
                    <SelectTrigger id="edit-priority">
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
                  <Label htmlFor="edit-assignee">Assignee</Label>
                  <Select
                    value={currentTask.assigneeId}
                    onValueChange={(value) => setCurrentTask({ ...currentTask, assigneeId: value })}
                  >
                    <SelectTrigger id="edit-assignee">
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
                <Label htmlFor="edit-dueDate">Due Date</Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={currentTask.dueDate}
                  onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditTaskDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditTask}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Task Table Component
function TaskTable({
  tasks,
  onDelete,
  onStatusChange,
  onEdit,
}: {
  tasks: any[]
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: string) => void
  onEdit: (task: any) => void
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No tasks found
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{task.title}</div>
                    <div className="text-xs text-muted-foreground">{task.project}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Select value={task.status} onValueChange={(value) => onStatusChange(task.id, value)}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          {task.status === "completed" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : task.status === "in-progress" ? (
                            <Clock className="h-4 w-4 text-amber-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-gray-300" />
                          )}
                          <span className="capitalize">{task.status.replace("-", " ")}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-gray-300" />
                          <span>Pending</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="in-progress">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-amber-500" />
                          <span>In Progress</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="completed">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Completed</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"
                    }
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
                    </Avatar>
                    <span>{task.assignee.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEdit(task)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(task.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

