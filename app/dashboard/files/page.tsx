"use client"

import { useState } from "react"
import {
  File,
  FileText,
  FileImage,
  FileArchive,
  FilePlus,
  Download,
  Trash2,
  MoreHorizontal,
  Search,
  Upload,
  Grid,
  List,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

// Sample team members data
const teamMembers = [
  { id: 1, name: "Alex Smith", avatar: "AS" },
  { id: 2, name: "Maria Kim", avatar: "MK" },
  { id: 3, name: "Robert Brown", avatar: "RB" },
  { id: 4, name: "Tina Murphy", avatar: "TM" },
  { id: 5, name: "John Doe", avatar: "JD" },
]

// Sample files data
const initialFiles = [
  {
    id: 1,
    name: "Project Requirements.docx",
    type: "document",
    size: "2.4 MB",
    uploadedBy: teamMembers[4], // John Doe
    uploadedDate: "2023-10-01",
    project: "Website Redesign",
  },
  {
    id: 2,
    name: "Homepage Mockup.png",
    type: "image",
    size: "4.8 MB",
    uploadedBy: teamMembers[0], // Alex Smith
    uploadedDate: "2023-10-02",
    project: "Website Redesign",
  },
  {
    id: 3,
    name: "API Documentation.pdf",
    type: "document",
    size: "1.2 MB",
    uploadedBy: teamMembers[1], // Maria Kim
    uploadedDate: "2023-10-03",
    project: "Mobile App Development",
  },
  {
    id: 4,
    name: "User Flow Diagram.png",
    type: "image",
    size: "3.5 MB",
    uploadedBy: teamMembers[3], // Tina Murphy
    uploadedDate: "2023-10-04",
    project: "Website Redesign",
  },
  {
    id: 5,
    name: "Database Schema.sql",
    type: "code",
    size: "0.8 MB",
    uploadedBy: teamMembers[1], // Maria Kim
    uploadedDate: "2023-10-05",
    project: "Mobile App Development",
  },
  {
    id: 6,
    name: "Project Assets.zip",
    type: "archive",
    size: "15.2 MB",
    uploadedBy: teamMembers[0], // Alex Smith
    uploadedDate: "2023-10-06",
    project: "Website Redesign",
  },
  {
    id: 7,
    name: "Meeting Notes.docx",
    type: "document",
    size: "1.1 MB",
    uploadedBy: teamMembers[4], // John Doe
    uploadedDate: "2023-10-07",
    project: "Team Collaboration",
  },
  {
    id: 8,
    name: "Logo Design.ai",
    type: "design",
    size: "5.7 MB",
    uploadedBy: teamMembers[3], // Tina Murphy
    uploadedDate: "2023-10-08",
    project: "Branding",
  },
]

export default function FilesPage() {
  const [files, setFiles] = useState(initialFiles)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  // Filter files based on search query
  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.uploadedBy.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle file upload
  const handleFileUpload = () => {
    setIsUploading(true)

    // Simulate API call delay
    setTimeout(() => {
      const newFile = {
        id: files.length + 1,
        name: "New Uploaded File.pdf",
        type: "document",
        size: "3.2 MB",
        uploadedBy: teamMembers[4], // John Doe (current user)
        uploadedDate: new Date().toISOString().split("T")[0],
        project: "Website Redesign",
      }

      setFiles([newFile, ...files])
      setIsUploading(false)
    }, 1500)
  }

  // Handle file deletion
  const handleDeleteFile = (fileId: number) => {
    setFiles(files.filter((file) => file.id !== fileId))
  }

  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "document":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "image":
        return <FileImage className="h-6 w-6 text-green-500" />
      case "archive":
        return <FileArchive className="h-6 w-6 text-amber-500" />
      case "code":
        return <File className="h-6 w-6 text-purple-500" />
      case "design":
        return <File className="h-6 w-6 text-pink-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Files</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}>
              {viewMode === "list" ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
              <span className="sr-only">Toggle view</span>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload File</DialogTitle>
                  <DialogDescription>Upload a file to share with your team.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="file">File</Label>
                    <div className="flex items-center gap-2">
                      <Input id="file" type="file" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project">Project</Label>
                    <Input id="project" placeholder="Select project" defaultValue="Website Redesign" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Input id="description" placeholder="Add a description" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>
                    Cancel
                  </Button>
                  <Button onClick={handleFileUpload} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        {viewMode === "list" ? (
          <TabsContent value="all" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isUploading && (
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-6 w-6 rounded" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-6 w-6 rounded-full" />
                          <Skeleton className="h-4 w-[80px]" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[50px]" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-8 w-8 rounded" />
                          <Skeleton className="h-8 w-8 rounded" />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredFiles.length === 0 && !isUploading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No files found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFiles.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <span className="font-medium">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.project}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{file.uploadedBy.avatar}</AvatarFallback>
                            </Avatar>
                            <span>{file.uploadedBy.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(file.uploadedDate)}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(file.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ) : (
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isUploading && (
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-4 w-[120px]" />
                      </div>
                      <Skeleton className="h-4 w-full mb-2" />
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-[60px]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {filteredFiles.map((file) => (
                <Card key={file.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-muted/30 p-6 flex justify-center">{getFileIcon(file.type)}</div>
                    <div className="p-4">
                      <div className="mb-2 font-medium truncate" title={file.name}>
                        {file.name}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{file.project}</span>
                        <span>{file.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[10px]">{file.uploadedBy.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{formatDate(file.uploadedDate)}</span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteFile(file.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredFiles.length === 0 && !isUploading && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <FilePlus className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No files found</h3>
                  <p className="text-muted-foreground mb-4">Upload a file or change your search query</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Upload File</DialogTitle>
                        <DialogDescription>Upload a file to share with your team.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="file-upload">File</Label>
                          <Input id="file-upload" type="file" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="project-select">Project</Label>
                          <Input id="project-select" placeholder="Select project" defaultValue="Website Redesign" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {}}>
                          Cancel
                        </Button>
                        <Button onClick={handleFileUpload}>Upload</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </TabsContent>
        )}

        {/* Filter tabs for specific file types */}
        <TabsContent value="documents">
          {viewMode === "list" ? (
            <div className="rounded-md border mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles
                    .filter((file) => file.type === "document")
                    .map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <span className="font-medium">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.project}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{file.uploadedBy.avatar}</AvatarFallback>
                            </Avatar>
                            <span>{file.uploadedBy.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(file.uploadedDate)}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(file.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {filteredFiles
                .filter((file) => file.type === "document")
                .map((file) => (
                  <Card key={file.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="bg-muted/30 p-6 flex justify-center">{getFileIcon(file.type)}</div>
                      <div className="p-4">
                        <div className="mb-2 font-medium truncate" title={file.name}>
                          {file.name}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>{file.project}</span>
                          <span>{file.size}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[10px]">{file.uploadedBy.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{formatDate(file.uploadedDate)}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteFile(file.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        {/* Similar TabsContent for "images" and "other" tabs */}
        <TabsContent value="images">{/* Similar content as documents tab but filtered for images */}</TabsContent>

        <TabsContent value="other">
          {/* Similar content as documents tab but filtered for other file types */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

