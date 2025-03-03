'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  ArrowLeft,
  AtSign,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Home,
  Image as ImageIcon,
  MapPin,
  MessageSquare,
  Paperclip,
  Send,
  User,
  UserCog
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ComplaintDetailPage({ params }) {
  const router = useRouter()
  const { comp_id } = params
  const [newMessage, setNewMessage] = useState('')
  const [status, setStatus] = useState('open')
  const [priority, setPriority] = useState('high')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAdmin, setIsAdmin] = useState(true) // Toggle between resident/admin view

  // Mock complaint data - in a real app this would come from an API call
  const complaint = {
    id: 'C-001',
    title: 'Water leak in bathroom ceiling',
    description: 'There is a water leak coming from the ceiling in my bathroom. It appears to be coming from the unit above me. The leak has gotten worse over the past 24 hours and there is now water damage visible on the ceiling.',
    category: 'Plumbing',
    status: 'open',
    priority: 'high',
    submittedBy: 'John Doe',
    unit: '402',
    createdAt: '2025-02-28T14:30:00',
    updatedAt: '2025-02-28T15:45:00',
    images: ['/images/leak-1.jpg', '/images/leak-2.jpg'],
    assignedTo: null,
    timeline: [
      { 
        action: 'Complaint created',
        timestamp: '2025-02-28T14:30:00',
        user: 'John Doe',
        role: 'resident'
      },
      { 
        action: 'Added additional photos',
        timestamp: '2025-02-28T14:45:00',
        user: 'John Doe',
        role: 'resident'
      },
      { 
        action: 'Updated status to urgent',
        timestamp: '2025-02-28T15:15:00',
        user: 'Building Management',
        role: 'admin'
      }
    ],
    messages: [
      {
        id: 'm1',
        sender: 'John Doe',
        role: 'resident',
        text: 'I just noticed water dripping from my bathroom ceiling. It seems to be coming from the unit above.',
        timestamp: '2025-02-28T14:30:00'
      },
      {
        id: 'm2',
        sender: 'Building Management',
        role: 'admin',
        text: 'Thank you for reporting this, Mr. Doe. We\'ll send someone to investigate right away.',
        timestamp: '2025-02-28T14:40:00'
      },
      {
        id: 'm3',
        sender: 'John Doe',
        role: 'resident',
        text: 'The leak is getting worse, please help! I\'ve put a bucket under it for now, but water is starting to damage the ceiling.',
        timestamp: '2025-02-28T15:45:00'
      },
      {
        id: 'm4',
        sender: 'Building Management',
        role: 'admin',
        text: 'Our maintenance team is on the way. They should arrive at your unit within the next 15-20 minutes.',
        timestamp: '2025-02-28T15:50:00'
      }
    ]
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  // Format just the time for chat messages
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    // Here you would typically call an API to save the message
    const message = {
      id: `m${complaint.messages.length + 1}`,
      sender: isAdmin ? 'Building Management' : complaint.submittedBy,
      role: isAdmin ? 'admin' : 'resident',
      text: newMessage,
      timestamp: new Date().toISOString()
    }
    
    // For demo purposes, we'll just add it to our local state
    complaint.messages = [...complaint.messages, message]
    setNewMessage('')
  }

  // Handle status change
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
    // Here you would call an API to update the complaint status
  }

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch(status) {
      case 'open': return 'destructive'
      case 'in-progress': return 'warning'
      case 'resolved': return 'success'
      default: return 'outline'
    }
  }

  // Get priority badge variant
  const getPriorityVariant = (priority) => {
    switch(priority) {
      case 'low': return 'success'
      case 'medium': return 'warning'
      case 'high': return 'destructive'
      case 'critical': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Header with back button */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{complaint.title}</h1>
        </div>
        
        {isAdmin && (
          <div className="flex items-center gap-2">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Button>Save Changes</Button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Left column - Chat section */}
        <Card className="lg:col-span-2 flex flex-col h-[calc(100vh-130px)] sticky top-20">
          <CardHeader className="shrink-0 py-4 px-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Communication</CardTitle>
                <CardDescription>
                  Messages between resident and management
                </CardDescription>
              </div>
              <Badge variant="outline">{complaint.messages.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full px-6">
              <div className="flex flex-col gap-4 py-4">
                {complaint.messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex gap-3 ${
                      message.role === 'admin' ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <Avatar className={message.role === 'admin' ? 'bg-primary' : 'bg-muted'}>
                      <AvatarFallback>
                        {message.role === 'admin' ? 'BM' : 'JD'}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        message.role === 'admin' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t bg-card shrink-0 p-4">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Textarea 
                placeholder="Type your message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[60px] resize-none"
              />
              <div className="flex flex-col gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" type="button">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Attach file</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardFooter>
        </Card>

        {/* Right column - Complaint details */}
        <div className="space-y-6 lg:col-span-1">
          {/* Details card */}
          <Card>
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium leading-none mb-2">Status & Priority</h3>
                <div className="flex gap-2">
                  <Badge variant={getStatusVariant(complaint.status)}>
                    {complaint.status === 'open' && "Open"}
                    {complaint.status === 'in-progress' && "In Progress"}
                    {complaint.status === 'resolved' && "Resolved"}
                  </Badge>
                  <Badge variant={getPriorityVariant(complaint.priority)}>
                    {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium leading-none mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{complaint.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>ID: {complaint.id}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Submitted by: {complaint.submittedBy}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Unit: {complaint.unit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Created: {formatDate(complaint.createdAt)}</span>
                </div>
                {complaint.assignedTo && (
                  <div className="flex items-center gap-2 text-sm">
                    <UserCog className="h-4 w-4 text-muted-foreground" />
                    <span>Assigned to: {complaint.assignedTo}</span>
                  </div>
                )}
              </div>

              {/* Images */}
              {complaint.images && complaint.images.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium leading-none mb-2">Images</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {complaint.images.map((img, index) => (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <div className="relative h-24 overflow-hidden rounded-md cursor-pointer border hover:opacity-90">
                            <div className="absolute inset-0 flex items-center justify-center bg-muted">
                              <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                            {/* Image would typically be loaded here - using placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Image {index + 1}</DialogTitle>
                          </DialogHeader>
                          <div className="relative aspect-video w-full overflow-hidden rounded-md">
                            <div className="absolute inset-0 flex items-center justify-center bg-muted">
                              <ImageIcon className="h-10 w-10 text-muted-foreground" />
                            </div>
                            {/* Image would typically be loaded here - using placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline card */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaint.timeline.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative mt-1">
                      <div className="flex h-2 w-2 rounded-full bg-primary"></div>
                      {index < complaint.timeline.length - 1 && (
                        <div className="absolute left-1 top-2 h-full w-px -translate-x-1/2 bg-border"></div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {event.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(event.timestamp)} by {event.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions card */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance Team</SelectItem>
                      <SelectItem value="plumbing">Plumbing Specialist</SelectItem>
                      <SelectItem value="electrical">Electrical Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="critical">Critical Priority</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button className="w-full">
                    Schedule Maintenance Visit
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Mark as Duplicate
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}