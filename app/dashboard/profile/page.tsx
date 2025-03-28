"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Check, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Sample user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Manager",
  company: "Acme Inc.",
  bio: "Experienced project manager with a passion for team collaboration and efficient workflows.",
  teams: ["Engineering", "Design", "Marketing"],
  joinDate: "January 15, 2023",
  recentActivity: [
    {
      id: 1,
      action: "Created new project",
      target: "Website Redesign",
      date: "October 2, 2023",
      time: "10:30 AM",
    },
    {
      id: 2,
      action: "Assigned task to",
      target: "Maria Kim",
      date: "October 1, 2023",
      time: "3:45 PM",
    },
    {
      id: 3,
      action: "Completed task",
      target: "Project Planning",
      date: "September 30, 2023",
      time: "2:15 PM",
    },
    {
      id: 4,
      action: "Added comment on",
      target: "Mobile App Development",
      date: "September 29, 2023",
      time: "11:20 AM",
    },
    {
      id: 5,
      action: "Updated status of",
      target: "API Integration",
      date: "September 28, 2023",
      time: "4:10 PM",
    },
  ],
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    company: userData.company,
    bio: userData.bio,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the data to the server here
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      company: userData.company,
      bio: userData.bio,
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left column - Profile info */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </div>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSubmit}>
                    <Check className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="/placeholder.svg?height=128&width=128" />
                      <AvatarFallback className="text-4xl">
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute bottom-0 right-0 rounded-full bg-background"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change avatar</span>
                    </Button>
                  </div>
                  <div className="text-center">
                    <Badge>{userData.role}</Badge>
                    <p className="mt-2 text-sm text-muted-foreground">Member since {userData.joinDate}</p>
                  </div>
                </div>

                {/* Profile details */}
                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <form className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={userData.email} disabled />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" name="company" value={formData.company} onChange={handleChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                        <p>{userData.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <p>{userData.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
                        <p>{userData.company}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                        <p>{userData.bio}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Teams</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {userData.teams.map((team) => (
                            <Badge key={team} variant="outline">
                              {team}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Your recent actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p>
                        <span className="font-medium">{activity.action}</span>{" "}
                        <span className="text-primary">{activity.target}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.date} at {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Preferences */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="notifications">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                </TabsList>
                <TabsContent value="notifications" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email updates about your activity</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="task-notifications">Task Assignments</Label>
                      <p className="text-sm text-muted-foreground">Get notified when you're assigned to a task</p>
                    </div>
                    <Switch id="task-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="project-updates">Project Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about project status changes</p>
                    </div>
                    <Switch id="project-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </TabsContent>
                <TabsContent value="appearance" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Theme Preference</Label>
                      <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                    </div>
                    <div>
                      <Tabs defaultValue="system" className="w-[200px]">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="light">Light</TabsTrigger>
                          <TabsTrigger value="dark">Dark</TabsTrigger>
                          <TabsTrigger value="system">System</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduce-motion">Reduce Motion</Label>
                      <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                    </div>
                    <Switch id="reduce-motion" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Enable Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

