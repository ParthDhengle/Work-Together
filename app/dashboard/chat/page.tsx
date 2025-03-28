"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Smile, Image, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

// Sample team members data
const teamMembers = [
  { id: 1, name: "Alex Smith", avatar: "AS", status: "online" },
  { id: 2, name: "Maria Kim", avatar: "MK", status: "online" },
  { id: 3, name: "Robert Brown", avatar: "RB", status: "offline" },
  { id: 4, name: "Tina Murphy", avatar: "TM", status: "away" },
  { id: 5, name: "John Doe", avatar: "JD", status: "online" },
]

// Sample messages data
const initialMessages = [
  {
    id: 1,
    sender: teamMembers[4], // John Doe
    text: "Good morning team! How's everyone doing today?",
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), // 3 hours ago
    isCurrentUser: true,
  },
  {
    id: 2,
    sender: teamMembers[0], // Alex Smith
    text: "Morning John! I'm doing well, just started working on the homepage redesign.",
    timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(), // 2.5 hours ago
    isCurrentUser: false,
  },
  {
    id: 3,
    sender: teamMembers[1], // Maria Kim
    text: "Hi everyone! I've finished the API integration for the authentication system. Let me know if you need any help with connecting to it.",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    isCurrentUser: false,
  },
  {
    id: 4,
    sender: teamMembers[4], // John Doe
    text: "Great work, Maria! Alex, how long do you think the homepage redesign will take?",
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(), // 1.5 hours ago
    isCurrentUser: true,
  },
  {
    id: 5,
    sender: teamMembers[0], // Alex Smith
    text: "I should have a first draft ready by the end of the day. I'll share it in our design channel once it's ready for feedback.",
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), // 1 hour ago
    isCurrentUser: false,
  },
  {
    id: 6,
    sender: teamMembers[4], // John Doe
    text: "Sounds good! Let's have a quick review meeting tomorrow morning.",
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    isCurrentUser: true,
  },
  {
    id: 7,
    sender: teamMembers[1], // Maria Kim
    text: "Works for me! By the way, has anyone seen the latest requirements document? I need to check something about the user profile page.",
    timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    isCurrentUser: false,
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const message = {
        id: messages.length + 1,
        sender: teamMembers[4], // John Doe (current user)
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isCurrentUser: true,
      }

      setMessages([...messages, message])
      setNewMessage("")
      setIsLoading(false)

      // Focus back on textarea
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }, 500)
  }

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups: any, message) => {
    const date = new Date(message.timestamp).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
    return groups
  }, {})

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex h-full">
        {/* Team members sidebar */}
        <div className="hidden w-64 border-r md:block">
          <div className="p-4">
            <h2 className="mb-4 font-semibold">Team Chat</h2>
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 rounded-md p-2 hover:bg-muted cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${
                        member.status === "online"
                          ? "bg-green-500"
                          : member.status === "away"
                            ? "bg-amber-500"
                            : "bg-gray-300"
                      }`}
                    />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium leading-none">{member.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{member.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-1 flex-col">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">Team Chat</h2>
              <Badge variant="secondary" className="ml-2">
                {teamMembers.filter((m) => m.status === "online").length} online
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                <DropdownMenuItem>Pin conversation</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Leave chat</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-6">
              {Object.entries(groupedMessages).map(([date, msgs]) => (
                <div key={date} className="space-y-4">
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t"></div>
                    <span className="mx-4 flex-shrink text-xs text-muted-foreground">{date}</span>
                    <div className="flex-grow border-t"></div>
                  </div>
                  {(msgs as typeof messages).map((message) => (
                    <div key={message.id} className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`flex max-w-[80%] ${
                          message.isCurrentUser ? "flex-row-reverse" : "flex-row"
                        } items-start gap-2`}
                      >
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback>{message.sender.avatar}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <span className="text-xs font-medium">
                              {message.isCurrentUser ? "You" : message.sender.name}
                            </span>
                            <span className="text-xs opacity-70">{formatTimestamp(message.timestamp)}</span>
                          </div>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-end">
                  <div className="flex max-w-[80%] flex-row-reverse items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Skeleton className="h-[80px] w-[200px] rounded-lg" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Message input */}
          <div className="border-t p-4">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Textarea
                  ref={textareaRef}
                  placeholder="Type your message..."
                  className="min-h-[80px] resize-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" type="button">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button variant="outline" size="icon" type="button">
                  <Image className="h-4 w-4" />
                  <span className="sr-only">Attach image</span>
                </Button>
                <Button variant="outline" size="icon" type="button">
                  <Smile className="h-4 w-4" />
                  <span className="sr-only">Add emoji</span>
                </Button>
                <Button type="button" onClick={handleSendMessage} disabled={isLoading}>
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

