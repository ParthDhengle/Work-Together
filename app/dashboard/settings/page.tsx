"use client"

import { useState } from "react"
import { Camera, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Profile settings
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Manager",
    company: "Acme Inc.",
    bio: "Experienced project manager with a passion for team collaboration and efficient workflows.",
    jobTitle: "Senior Project Manager",
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    website: "https://johndoe.com",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    taskAssignments: true,
    projectUpdates: true,
    teamMessages: true,
    marketingEmails: false,
  })

  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    reduceMotion: false,
    highContrast: false,
    fontSize: "medium",
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30m",
    loginNotifications: true,
  })

  // Handle profile update
  const handleProfileUpdate = () => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, you would save the data to the server here
    }, 1000)
  }

  // Handle notification settings update
  const handleNotificationUpdate = (key: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value,
    })
  }

  // Handle appearance settings update
  const handleAppearanceUpdate = (key: string, value: any) => {
    setAppearanceSettings({
      ...appearanceSettings,
      [key]: value,
    })
  }

  // Handle security settings update
  const handleSecurityUpdate = (key: string, value: any) => {
    setSecuritySettings({
      ...securitySettings,
      [key]: value,
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src="/placeholder.svg?height=128&width=128" />
                        <AvatarFallback className="text-4xl">
                          {profileData.name
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
                      <Badge>{profileData.role}</Badge>
                      <p className="mt-2 text-sm text-muted-foreground">{profileData.jobTitle}</p>
                    </div>
                  </div>

                  {/* Profile details */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={profileData.email} disabled />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          value={profileData.jobTitle}
                          onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          rows={4}
                        />
                      </div>
                    </div>
                    <Button onClick={handleProfileUpdate} disabled={isLoading}>
                      {isLoading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email updates about your activity</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationUpdate("emailNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="task-notifications">Task Assignments</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you're assigned to a task</p>
                  </div>
                  <Switch
                    id="task-notifications"
                    checked={notificationSettings.taskAssignments}
                    onCheckedChange={(checked) => handleNotificationUpdate("taskAssignments", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="project-updates">Project Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about project status changes</p>
                  </div>
                  <Switch
                    id="project-updates"
                    checked={notificationSettings.projectUpdates}
                    onCheckedChange={(checked) => handleNotificationUpdate("projectUpdates", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="team-messages">Team Messages</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new messages in team chats</p>
                  </div>
                  <Switch
                    id="team-messages"
                    checked={notificationSettings.teamMessages}
                    onCheckedChange={(checked) => handleNotificationUpdate("teamMessages", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationUpdate("marketingEmails", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Work Together looks for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                  </div>
                  <ThemeToggle />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduce-motion">Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                  </div>
                  <Switch
                    id="reduce-motion"
                    checked={appearanceSettings.reduceMotion}
                    onCheckedChange={(checked) => handleAppearanceUpdate("reduceMotion", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast">High Contrast</Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Switch
                    id="high-contrast"
                    checked={appearanceSettings.highContrast}
                    onCheckedChange={(checked) => handleAppearanceUpdate("highContrast", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="font-size">Font Size</Label>
                    <p className="text-sm text-muted-foreground">Adjust the text size</p>
                  </div>
                  <Select
                    value={appearanceSettings.fontSize}
                    onValueChange={(value) => handleAppearanceUpdate("fontSize", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecurityUpdate("twoFactorAuth", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out after a period of inactivity</p>
                  </div>
                  <Select
                    value={securitySettings.sessionTimeout}
                    onValueChange={(value) => handleSecurityUpdate("sessionTimeout", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15m">15 minutes</SelectItem>
                      <SelectItem value="30m">30 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="4h">4 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="login-notifications">Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new login attempts</p>
                  </div>
                  <Switch
                    id="login-notifications"
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => handleSecurityUpdate("loginNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

